import { tags } from "@/constants";
import { TResponseRedux, User } from "@/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendLoginRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login/initiate",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: [tags.userTag],
      transformResponse: (response: TResponseRedux<User>) => {
        return response.data;
      },
    }),
    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/forgot-password",
          body: data,
          method: "POST",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          body: data,
          method: "PATCH",
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendLoginRequestMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
} = authApi;
