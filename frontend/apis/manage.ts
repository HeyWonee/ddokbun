import { AxiosError } from "axios";
import AXIOS from ".";
import { RegisterType } from "../common/Button";

export const fetchAllPlantsList = async () => {
  const url = "/pot/plant-info";

  try {
    const res = await AXIOS({
      method: "get",
      url,
    });
    return res.data.content;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const fetchRegisterPot = async (data: RegisterType) => {
  const url = "pot";
  try {
    const res = await AXIOS({
      method: "put",
      url,
      data,
    });

    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const fetchPlantData = async (plantSeq: string) => {
  const url = `pot/${plantSeq}/plant-info`;

  try {
    const res = await AXIOS({
      method: "get",
      url,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const fetchPlantsList = async (token?: string) => {
  const url = "pot/my-pot";

  try {
    const res = await AXIOS({
      method: "get",
      url,
      headers: {
        authorization: token,
      },
    });
    return res.data.content;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const fetchCurrentStatus = async (
  potSeq?: string | string[],
  token?: string,
) => {
  const url = `pot/${potSeq}`;

  try {
    const res = await AXIOS({
      method: "get",
      url,
      headers: {
        authorization: token,
      },
    });

    return res.data.content;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
    return err.response?.status;
  }
};

export const changeAutoWateringStatus = async (potSeq: string) => {
  const url = `pot/${potSeq}/water`;

  try {
    const res = await AXIOS({
      method: "put",
      url,
    });
    return res;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const fetchLogs = async (
  identifier: string,
  potSeq?: string | string[],
  token?: string,
) => {
  const url = `pot/${potSeq}/${identifier}`;
  try {
    const res = await AXIOS({
      method: "get",
      url,
      headers: {
        authorization: token,
      },
    });

    return res.data.content;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response);
  }
};

export const watering = async (potSeq: string | string[]) => {
  const url = `pot/${potSeq}/water`;

  try {
    const res = await AXIOS({
      method: "post",
      url,
      params: {
        value: 30,
      },
    });
    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const changeWateringStatus = async (
  potSeq: string,
  waterPeriod: string,
) => {
  const url = `pot/${potSeq}/water/${waterPeriod}`;
  try {
    const res = await AXIOS({
      method: "put",
      url,
    });

    console.log(res);
  } catch (error) {}
};

export const fetchWateringLogs = async (
  potSeq: string | string[],
  year: number,
  month: number,
) => {
  const url = `/pot/${potSeq}/water`;
  try {
    const res = await AXIOS({
      method: "get",
      url,
      params: {
        year,
        month,
      },
    });

    return res.data.content;
  } catch (error) {
    console.log(error);
  }
};
