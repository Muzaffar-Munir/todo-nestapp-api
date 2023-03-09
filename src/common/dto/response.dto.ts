/* eslint-disable prettier/prettier */
import { IPaginatedResponse } from '../interfaces/response.interface';


export class PaginatedResponse implements IPaginatedResponse {
  statusCode: number;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  constructor(
    success: boolean,
    statusCode: number,
    data?: any,
    totalRecords?: number,
    totalPages?: number,
    currentPage?: number,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.totalRecords = totalRecords;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.data = data;
  }
  data: any;
  success: boolean;
}
