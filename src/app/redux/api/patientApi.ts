import type { IDoctor } from "../../../types/interface";
import type { ApiDataType } from "../../../types/type";
import { baseApi } from "./baseApi";

export const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllPatient: builder.query<ApiDataType<IDoctor>, string>({
        query: (id) => `patient/get-patient/${id}`,
        providesTags: ["Patient"],
      }),
    };
  },
});

export const { useGetAllPatientQuery } = patientApi;
