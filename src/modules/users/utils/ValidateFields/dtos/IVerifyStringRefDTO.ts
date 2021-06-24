export default interface IVerifyStringRefDTO {
  field: string;
  fieldName: string;
  isOnlyString?: boolean;
  length?: number;
  ref?: string;
  refFieldName?: string;
  same?: string;
}
