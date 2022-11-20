export type TApiResponse<TData> = {
    success: boolean;
    msg: string;
    response: TData;
};

export interface IDashboardData {
    totalDeposit: string;
    lastMonthDeposit: string;
    totalFundRaising: string;
    totalFine: string;
    totalUsers: number;
    totalAccounts: number;
    ifsa1Accounts: number;
    ifsa2Accounts: number;
    deposits: IDeposit[];
}

export interface IDeposit {
    id: number;
    user_id: number;
    ifsa_id: number;
    amount: number;
    due: number;
    fine: number;
    fund_raising: number;
    status: number;
    cancel_reason?: any;
    deposit_for: string;
    approved_by?: any;
    approved_at?: any;
    created_at: string;
    updated_at: string;
    user: IUser;
    account: IAccount;
}

export interface IAccount {
    id: number;
    user_id: number;
    account_type: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface IUser {
    id: number;
    name: string;
    phone: string;
}
