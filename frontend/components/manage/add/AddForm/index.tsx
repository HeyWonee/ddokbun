import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  CancelButton,
  RegisterType,
  SubmitButton,
} from "../../../../common/Button";
import { DateInput, Input, SearchInput } from "../../../../common/Input";
import { Wrapper } from "./styles";
import calander from "../../../../assets/icon/calander.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchPlantData, fetchRegisterPot } from "../../../../apis/manage";
import PlantData from "../PlantData";
import Link from "next/link";
import Swal from "sweetalert2";

export interface PlantDataType {
  growthHumid: string;
  lightType: number;
  temperatureRange: number;
  waterCycle: number;
}

const AddForm = () => {
  const router = useRouter();
  const plantSeq = useSelector((state: RootState) => state.manage.plantSeq);
  const name = useSelector((state: RootState) => state.manage.plantName);
  const userSeq = useSelector((state: RootState) => state.authSlice.userSeq);

  const inputValues: React.MutableRefObject<RegisterType> = useRef({
    potSerial: "",
    plantNickname: "",
    waterSupply: "",
    plantSeq: "",
  });
  const [plantData, setPlantData] = useState<PlantDataType>();
  const [showCalander, setShowCalander] = useState(false);
  const leftPad = (value: number) => {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  };
  const changeDateFormat = (date: Date, delimiter = "-") => {
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());

    return [year, month, day].join(delimiter);
  };

  const saveInput = (value: string | Date, identifier: string) => {
    setShowCalander(prev => !prev);

    if (typeof value === "string") {
      switch (identifier) {
        case "potSerial":
          inputValues.current.potSerial = value;
          break;
        case "plantNickname":
          inputValues.current.plantNickname = value;
          break;
        case "plantSeq":
          inputValues.current.plantSeq = value;
          break;
        default:
          break;
      }
    } else {
      const date = changeDateFormat(value);
      inputValues.current.waterSupply = date;
    }
  };

  const onRegisterHandler = async (): Promise<void> => {
    if (!inputValues.current.plantNickname) {
      Swal.fire("닉네임을 입력해주세요");
    } else if (!inputValues.current.potSerial) {
      Swal.fire("씨리얼 넘버를 입력해주세요.");
    } else if (!inputValues.current.waterSupply) {
      Swal.fire("마지막으로 물 준 일자를 확인해주세요.");
    }

    const res = await fetchRegisterPot(inputValues.current);
    router.push(`/manage/${userSeq}`);
    if (res?.code === 200) {
    } else {
      Swal.fire("혹시 화분을 아직 구매하지 않으셨나요?");
    }
  };

  const onShowCalanderHandler = () => {
    setShowCalander(prev => !prev);
  };

  const getPlantData = async (data: string) => {
    const res = await fetchPlantData(data);
    setPlantData(res.content);
    return res.content;
  };

  const onCancleAddForm = () => {
    router.back();
  };

  useEffect(() => {
    const date = changeDateFormat(new Date());
    inputValues.current.waterSupply = date;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    inputValues.current.plantSeq = plantSeq;
    if (inputValues.current.plantSeq) {
      getPlantData(inputValues.current.plantSeq);
    }
  }, [plantSeq]);

  return (
    <Wrapper>
      <div className="link-container">
        <span>'똑분'이 있어야 등록이 가능해요.</span>
        <Link href={"/commerce"}>식물 추천받고 화분을 구매해보세요.</Link>
      </div>
      <div className="grid">
        <SearchInput
          setSearchInput={null}
          placeholder="식물종 검색"
          disabled={true}
          value={name}
        />
        <Input
          saveInput={saveInput}
          label="씨리얼 넘버"
          placeholder="똑분 하단의 Serial Number를 기재해주세요"
          type="text"
          identifier="potSerial"
          image={null}
          value={inputValues.current.potSerial}
        />
        <Input
          saveInput={saveInput}
          label="식물 닉네임"
          placeholder="자신만의 식물 별명을 알려주세요"
          type="text"
          identifier="plantNickname"
          image={null}
          value={inputValues.current.plantNickname}
        />
        <div onClick={onShowCalanderHandler} className="calander-container">
          <DateInput
            label="마지막 물 준날"
            image={calander}
            saveInput={saveInput}
          />
        </div>
      </div>
      <div className="button-container">
        <div className="submit-button-container">
          <SubmitButton onRegisterHandler={onRegisterHandler}>
            등록
          </SubmitButton>
        </div>
        <div className="cancel-button-container">
          <CancelButton onClick={onCancleAddForm}>취소</CancelButton>
        </div>
      </div>
      {plantData && <PlantData data={plantData} />}
    </Wrapper>
  );
};

export default AddForm;
