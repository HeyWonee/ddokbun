package com.harryporter.ddokbun.domain.product.service;
import org.springframework.data.domain.Pageable;
import com.harryporter.ddokbun.domain.plant.dto.PlantDto;
import com.harryporter.ddokbun.domain.plant.entity.Plant;
import com.harryporter.ddokbun.domain.plant.repository.PlantRepository;
import com.harryporter.ddokbun.domain.product.dto.ItemDto;
import com.harryporter.ddokbun.domain.product.dto.request.InsertItemDto;
import com.harryporter.ddokbun.domain.product.dto.request.UpdateItemDto;
import com.harryporter.ddokbun.domain.product.dto.response.*;
import com.harryporter.ddokbun.domain.product.entity.Item;
import com.harryporter.ddokbun.domain.product.entity.TodayItem;
import com.harryporter.ddokbun.domain.product.repository.ItemRepository;
import com.harryporter.ddokbun.domain.product.repository.ItemRepositoryCustom;
import com.harryporter.ddokbun.exception.ErrorCode;
import com.harryporter.ddokbun.exception.GeneralException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemServiceImple implements ItemService{

    private final ItemRepositoryCustom itemRepositoryCustom;
    private final ItemRepository itemRepository;
    private final PlantRepository plantRepository;

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public List<ItemSearchDto> searchByTitle(String title) {
        log.info("searchByTitle :: title : {}",title);

        List<ItemSearchDto> itemSearchDtoList= itemRepositoryCustom.searchByTitle(title);

        return itemSearchDtoList;
    }

    @Override
    public List<ItemSimpleSearchDto> simpleSearchByTitle(String title) {

        log.info("simpleSearchByTitle :: titile : {}",title);
        List<ItemSearchDto> itemSearchDtoList = this.searchByTitle(title);

        List<ItemSimpleSearchDto> itemSimpleSearchDtoList = itemSearchDtoList.stream().map(dto ->{
            return new ItemSimpleSearchDto(dto.getItemSeq(),dto.getItemName(),dto.getItemImageUrl());
        }).collect(Collectors.toList());

        return itemSimpleSearchDtoList;

    }
    @Override
    @Transactional
    public ItemDetailDto getItemByPlantSeq(Long plantSeq) {
        Plant p = plantRepository.findByPlantSeq(plantSeq).orElseThrow(()->{
            throw new GeneralException(ErrorCode.NOT_FOUND);
        });

        Item item = itemRepository.findByPlant(p).orElseThrow(()->{
            throw new GeneralException(ErrorCode.NOT_FOUND);
        });


        ItemDetailDto idt = new ItemDetailDto();
        PlantDto plantDto =null;
        ItemDto itemDto = ItemDto.of(item);

        //kind??? 1?????? ??????
        //kind??? 2?????? ??????
        if(item.getItemKind().intValue() == 1){
            Plant plant=item.getPlant();
            plantDto = PlantDto.of(plant);
        }else if(item.getItemKind().intValue() == 2){
            plantDto = null;
        }

        idt.copy(itemDto);
        idt.setPlant(plantDto);

        return idt;


    }

    @Override
    @Transactional
    public ItemDetailDto getOneItemById(Long ItemSeq) {

        Item item = itemRepository.findById(ItemSeq).orElseThrow(()->{
           return new GeneralException(ErrorCode.NOT_FOUND);
        });


        ItemDetailDto idt = new ItemDetailDto();
        PlantDto plantDto =null;
        ItemDto itemDto = ItemDto.of(item);

        //kind??? 1?????? ??????
        //kind??? 2?????? ??????
        if(item.getItemKind().intValue() == 1){
            Plant plant=item.getPlant();
            plantDto = PlantDto.of(plant);
        }else if(item.getItemKind().intValue() == 2){
            plantDto = null;
        }

        idt.copy(itemDto);
        idt.setPlant(plantDto);

        return idt;


    }

    @Override
    public List<ItemSearchDto> getTodayRecommendItem() {


        List<TodayItem> todayItems = itemRepository.findTodayItemFetchItem();

       List<ItemSearchDto> itemSearchDtoList = todayItems.stream().map(
                todayItem ->  ItemSearchDto.of(todayItem.getItem())
        ).collect(Collectors.toList());

        return itemSearchDtoList;
    }


    @Transactional(value = Transactional.TxType.REQUIRED)
    @Override
    //?????? ???????????? ????????? ??????????????? ???????????? ????????? ????????????.
    public int decreaseQuantity(long itemSeq,int quantity){

        Item item =  itemRepository.findByIdWithWriteLock(itemSeq);
        if(quantity > item.getItemStock().intValue()){
            //?????? ?????? ??????
            log.info("????????? ?????? ?????? ?????? ???, ????????? ?????? ?????? :: itemSeq : {} :: quantity : {}:: stock : {}",
                    itemSeq,quantity,item.getItemStock());
            throw new GeneralException("?????? ????????? ???????????????.");
        }
        //???????????? ?????? ????????? ????????????.
        item.setItemStock(item.getItemStock().intValue() - quantity);

        return 0;
    }

    @Override
    public ItemDetailDto insertItem(InsertItemDto insertItemDto){
        log.info("?????? ?????? Service :: itemName : {}", insertItemDto.getItemName());
        Plant plant=null;
        if(insertItemDto.getItemKind()!=2) {
            log.info("itemKind {} :: ??????, ??????+??????",insertItemDto.getItemKind());
            plant = plantRepository.findByPlantSeq(insertItemDto.getPlantSeq()).orElseThrow(
                    ()-> new GeneralException(ErrorCode.NOT_FOUND,"????????? ?????? ??? ????????????."));
        }
        Item item = insertItemDto.toEntity(plant);
        try {
            itemRepository.save(item);
        }catch (Exception e){
            throw new GeneralException(ErrorCode.VALIDATION_ERROR,"?????? DB ????????? ?????????????????????. ");
        }
        log.info("?????? ?????? Success :: itemName : {}", item.getItemName());

        ItemDetailDto idt = new ItemDetailDto();
        idt.copy(ItemDto.of(item));
        idt.setPlant(PlantDto.of(item.getPlant()));
        return idt;
    }

    @Override
    public ItemDetailDto updateItem(UpdateItemDto updateItemDto){
        log.info("?????? ?????? Service :: itemName : {}", updateItemDto.getItemName());
        Item oldItem=itemRepository.findById(updateItemDto.getItemSeq()).orElseThrow(
                ()-> new GeneralException(ErrorCode.NOT_FOUND,"????????? ?????? ??? ????????????."));

        Plant plant=null;
        if(updateItemDto.getItemKind()!=2) {
            plant = plantRepository.findByPlantSeq(updateItemDto.getPlantSeq()).orElseThrow(
                    ()-> new GeneralException(ErrorCode.NOT_FOUND,"????????? ?????? ??? ????????????."));
        }
        Item newItem = updateItemDto.toEntity(plant);
        log.info("????????? update ??? :: {}",oldItem.getItemSeq());
        oldItem.changeItem(newItem);
        try {
            itemRepository.save(oldItem);
        }catch (Exception e){
            throw new GeneralException(ErrorCode.BAD_REQUEST,"?????? ????????? ??????????????????.");
        }
        log.info("?????? ?????? Success :: itemName : {}", oldItem.getItemName());

        ItemDetailDto idt = new ItemDetailDto();
        idt.copy(ItemDto.of(oldItem));
        idt.setPlant(PlantDto.of(oldItem.getPlant()));
        return idt;
    }

    @Override
    public String deleteItem(long itemSeq) {
        log.info("?????? ?????? Service :: itemSeq : {}", itemSeq);
        try {
            itemRepository.deleteById(itemSeq);
        }catch (Exception e){
           throw new GeneralException(ErrorCode.NOT_FOUND,"????????? ??????????????????, ???????????? ?????? ???????????????.");
        }
        log.info("?????? ?????? Success :: itemSeq : {}", itemSeq);
        return "Delete Success";
    }

    @Override
    public List<Long> getProductList(Pageable pageable){
        log.info("?????? ?????? ?????? ?????? Service :: ");
        List<Item> products = itemRepository.findAllBy(pageable);

        log.info("?????? ?????? ?????? ?????? Success :: ");
        return products.stream()
                .filter(product -> product.getItemSeq() != 0)
                .map(product -> product.getItemSeq()).collect(Collectors.toList());
    }
    @Override
    public List<ItemDetailDto> getAdminProductList(Pageable pageable){
        log.info("?????? ?????? ?????? ?????? Service :: ");
        List<Item> products = itemRepository.findAllBy(pageable);

        log.info("?????? ?????? ?????? ?????? Success :: ");
        return products.stream().map(product -> ItemDetailDto.of(product)).collect(Collectors.toList());
    }

    @Override
    public List<ItemListDto> getSimilarProduct(long itemSeq, Pageable pageable){
        log.info("?????? ?????? ?????? Service :: itemSeq : {}", itemSeq);
        List<Item> items = itemRepository.findItemNameByItemSeq(itemSeq,pageable);
        Collections.shuffle(items);

        log.info("?????? ?????? ?????? Success :: ?????? ?????? ?????? Size : {}", items.size());
        return items.stream()
                .filter(item -> item.getItemSeq() != itemSeq)
                .map(item -> ItemListDto.of(item)).collect(Collectors.toList());
    }

    @Override
    public List<ItemListDto> getProductByCategory(String category, Pageable pageable){
        log.info("???????????? ?????? Service :: Category : {}", category);
        List<Item> items = itemRepository.findByPlant_RecRateContainingIgnoreCase(category,pageable);
        Collections.shuffle(items);
        log.info("???????????? ?????? Success :: ?????? ?????? Size : {}", items.size());
        return items.stream().map(item -> ItemListDto.of(item)).collect(Collectors.toList());
     }


    @Override
    @Transactional(value = Transactional.TxType.REQUIRED)
    public String click(long itemSeq){
        log.info("????????? ?????? Service :: itemSeq : {}", itemSeq);
        Item item = itemRepository.findById(itemSeq).orElseThrow(
                ()-> new GeneralException(ErrorCode.NOT_FOUND,"????????? ?????? ??? ????????????."));

        item.increaseViewCount(item);

//        String key = "rank";
//        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();
//        ZSetOperations.incrementScore(key, itemSeq+"", 1);
        log.info("????????? ?????? Success :: {} score +1", item.getViewCount());
        return "Success";
    }

    @Override
    public List<ClickRankDto> SearchRankList() {
        log.info("?????? ?????? ?????? Service :: 1 - 10?????????");
        List<Item> items = itemRepository.findTop10ByOrderByViewCountDesc();
        List<ClickRankDto> list = items.stream()
                .map(item -> ClickRankDto.convertToClickRankDto(item))
                .collect(Collectors.toList());
//        String key = "rank";
//        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();
//        Set<ZSetOperations.TypedTuple<String>> typedTuples = ZSetOperations.reverseRangeWithScores(key, 0, 9);
//        if(typedTuples == null)
//            return null;
//        List<ClickRankDto> list = typedTuples.stream()
//                .map(tuple->ClickRankDto.convertToClickRankDto(tuple, itemRepository.findById(Long.parseLong(tuple.getValue())).orElse(null)))
//                .collect(Collectors.toList());
        log.info("?????? ?????? ?????? Success :: ?????? ?????? ?????? Size : {}",list.size());
        return list;
    }

    @Override
    public List<ItemSelectedDto> getSelectedProduct() {
        log.info("????????? ?????? ??????");
        long number[]={3, 6, 7, 11, 18, 20, 21,  27, 34, 75, 103, 109};
        List<Item> items=new ArrayList<>();
        for(int i=0; i<number.length;i++){
            items.add(itemRepository.findById(387+number[i]).orElse(null));
        }
        return items.stream().map(item -> ItemSelectedDto.of(item)).collect(Collectors.toList());
    }

}
