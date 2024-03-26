import { StatusState } from 'src/common/enums/task-status';

export interface StatusQueryParams {
    order?: string;
    type?: StatusState;
    limit?: number;
}
