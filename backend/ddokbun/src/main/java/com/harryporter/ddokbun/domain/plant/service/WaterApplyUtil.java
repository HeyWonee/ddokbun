package com.harryporter.ddokbun.domain.plant.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.harryporter.ddokbun.domain.plant.dto.MotorActionDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

//카프카 브로커에 물주는 명령을 하는 클래스
@Component
@Slf4j
@RequiredArgsConstructor
public class WaterApplyUtil {

    private final KafkaTemplate<String, String> kafkaTemplate;

    private final ObjectMapper objectMapper;
    //json mapper로 우리는 설정됨

    public boolean sendMotorAction(MotorActionDto motorActionDto) {

        try {
            //토픽이 아직 없다면. when ?, 화분의 컨슈머가 아직 등록되지 않은 상황이라 볼 수 있다. 그럴 일이 있을까?
            // 카프카 서버에 기본 설정에 맞게 생성됨
            //토픽이 있다면.
            // 메세지 전송만 하고 끝
            String data = objectMapper.writeValueAsString(motorActionDto);
            ListenableFuture<SendResult<String, String>> resultFuture = kafkaTemplate.send(motorActionDto.getPotSerial(), data);

            resultFuture.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
                @Override
                public void onFailure(Throwable ex) {
                    log.info("{} : {}",ex.getMessage(),ex.getCause().toString());
                }

                @Override
                public void onSuccess(SendResult<String, String> result) {
                    log.info("메세지 보내기 성공 : {}",result.toString());
                }
            });

            //동기가 되서 비동기일 떄보다 상당히 느려지겠지만 , 보장하기 위해서는 어쩔 수 없다.
            if (resultFuture.isDone())
                //메세지 정상 등록되지
                return true;
            else
                //메세지 실패
                return false;

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return false;
        }

    }

}