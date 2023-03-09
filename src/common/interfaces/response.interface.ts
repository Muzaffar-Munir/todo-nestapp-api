/* eslint-disable prettier/prettier */
export interface IPaginatedResponse {
  success: boolean;
  statusCode: number;
  totalRecords?: number;
  totalPages?: number;
  currentPage?: number;
  data: any;
}
