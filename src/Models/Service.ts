import { OptionalItem } from './OptionalItem';

export interface Service {
    Id: String;
    Name: String;
    BasePrice: Number;
    CostPerClient: Number;
    ClientQuantity: Number;
    EventDuration: Number;
    EventDate: Date;
    optionalItems?: OptionalItem[];
    FinalBudget: Number;
    DownPayment: Number;
    FinalPayment: Number;
}