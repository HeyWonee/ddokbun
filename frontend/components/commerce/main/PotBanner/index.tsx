import { Wrapper } from "./styles";
import Link from "next/link";
import Image from "next/image";
import PotImg from "../../../../assets/smart-pot.jpg";
import { EleVar } from "../../../../styles/animations/animation";

const PotBanner = () => {
  return (
    <Link href={"/commerce/product/pot"}>
      <Wrapper variants={EleVar}>
        <div className="content-wrap">
          <div className="img-wrap">
            <Image
              src={PotImg}
              alt="스마트 화분 이미지"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="text-wrap">
          <div className="text">
            <h2>Ddokbun's Smart Plant Pot</h2>
            <h3>똑분에서 직접 제작하고 판매하는 스마트 화분이에요.</h3>
            <h3>식물의 온도, 습도, 토양습도, 물 주기를 확인하고,</h3>
            <h3>생활 환경에 맞게 관리를 도와드릴게요.</h3>
            <div className="button">
              <Link href={"/commerce/product/pot"}>
                <div className="button-wrap">바로가기</div>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </Link>
  );
};

export default PotBanner;
