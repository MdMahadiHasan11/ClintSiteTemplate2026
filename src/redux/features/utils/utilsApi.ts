import { tags } from "@/constants";
import { IUtils, TArgsParam, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const url = "/utils";

const utilsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUtils: builder.query({
      query: (args: TArgsParam) => {
        const cleanedParams = Object.entries(args || {}).reduce(
          (acc, [key, value]) => {
            if (
              value !== null &&
              value !== undefined &&
              value !== "" &&
              value !== "all"
            ) {
              acc[key] = value;
            }
            return acc;
          },
          {} as TArgsParam
        );

        return {
          url: `${url}/all`,
          params: cleanedParams,
        };
      },
      transformResponse: (response: TResponseRedux<IUtils[]>) => {
        return {
          data: response.data,
          metadata: response.metadata,
        };
      },
      providesTags: [tags.utilsTag],
    }),
  }),
});
export const { useGetUtilsQuery } = utilsApi;
