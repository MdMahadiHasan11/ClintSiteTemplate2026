/* eslint-disable @typescript-eslint/no-explicit-any */
import { TArgsParam } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";

export function usePaymentsReport<TPaymentsReport>(
  useGetAllPaymentsReportQuery: any,
) {
  const [search, setSearch] = useState("");
  const paymentTypeOptions = [
    { value: "SUPPLIER", label: "Supplier" },
    { value: "EXPENSE", label: "Expense" },
    { value: "EMPLOYEE", label: "Employee" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "AGENT", label: "Agent" },
  ];
  const [selectPaymentOption, setSelectPaymentOption] = useState(null);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [dateFilterBy, setDateFilterBy] = useState("createdAt");
  const [paymentById, setPaymentById] = useState<string | undefined>(undefined);
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [vendorId, setVendorId] = useState<string | undefined>(undefined);
  const [agentId, setAgentId] = useState<string | undefined>(undefined);
  const [employeeId, setEmployeeId] = useState<string | undefined>(undefined);
  const [expenseHeadId, setExpenseHeadId] = useState<string | undefined>(
    undefined,
  );

  // State for applied filters (these are used in the query)
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedSelectPaymentOption, setAppliedSelectPaymentOption] =
    useState(null);
  const [appliedDateRange, setAppliedDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [appliedDateFilterBy, setAppliedDateFilterBy] = useState("createdAt");
  const [appliedPaymentById, setAppliedPaymentById] = useState<
    string | undefined
  >(undefined);
  const [appliedClientId, setAppliedClientId] = useState<string | undefined>(
    undefined,
  );
  const [appliedVendorId, setAppliedVendorId] = useState<string | undefined>(
    undefined,
  );
  const [appliedAgentId, setAppliedAgentId] = useState<string | undefined>(
    undefined,
  );
  const [appliedEmployeeId, setAppliedEmployeeId] = useState<
    string | undefined
  >(undefined);
  const [appliedExpenseHeadId, setAppliedExpenseHeadId] = useState<
    string | undefined
  >(undefined);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Function to apply all current filter values
  const applyFilters = () => {
    setAppliedSearch(search);
    setAppliedSelectPaymentOption(selectPaymentOption);
    setAppliedDateRange(dateRange);
    setAppliedDateFilterBy(dateFilterBy);
    setAppliedPaymentById(paymentById);
    setAppliedClientId(clientId);
    setAppliedVendorId(vendorId);
    setAppliedAgentId(agentId);
    setAppliedEmployeeId(employeeId);
    setAppliedExpenseHeadId(expenseHeadId);
    setPage(1); // Reset to first page when applying filters
  };

  const query: TArgsParam = {
    page,
    limit,
    sortBy,
    sortOrder,
    dateFilterBy: appliedDateFilterBy,
  };
  query["startDate"] = appliedDateRange[0]?.format("YYYY-MM-DD");
  query["endDate"] = appliedDateRange[1]?.format("YYYY-MM-DD");
  query["paymentType"] = appliedSelectPaymentOption;
  if (appliedPaymentById) query["paymentById"] = appliedPaymentById;
  if (appliedClientId) query["clientId"] = appliedClientId;
  if (appliedVendorId) query["vendorId"] = appliedVendorId;
  if (appliedAgentId) query["agentId"] = appliedAgentId;
  if (appliedEmployeeId) query["employeeId"] = appliedEmployeeId;
  if (appliedExpenseHeadId) query["expenseHeadId"] = appliedExpenseHeadId;

  // Only add search term to query when it's applied
  if (appliedSearch) query["search"] = appliedSearch;

  const {
    data: paymentsReport,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllPaymentsReportQuery({ args: query });

  return {
    paymentsReport: {
      data: paymentsReport?.data as TPaymentsReport[],
      metadata: paymentsReport?.metadata,
      isLoading,
      isFetching,
    },
    search,
    setSearch,
    dateRange,
    setDateRange,
    dateFilterBy,
    setDateFilterBy,
    paymentById,
    setPaymentById,
    clientId,
    setClientId,
    vendorId,
    setVendorId,
    agentId,
    setAgentId,
    employeeId,
    setEmployeeId,
    expenseHeadId,
    setExpenseHeadId,
    page,
    setPage,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    refetch,
    selectPaymentOption,
    setSelectPaymentOption,
    paymentTypeOptions,
    applyFilters, // Expose the applyFilters function
    // Applied filter values for UI components
    appliedSearch,
    appliedSelectPaymentOption,
    appliedDateRange,
    appliedDateFilterBy,
    appliedPaymentById,
    appliedClientId,
    appliedVendorId,
    appliedAgentId,
    appliedEmployeeId,
    appliedExpenseHeadId,
  };
}
