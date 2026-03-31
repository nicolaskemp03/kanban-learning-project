export type statuses = "pending" | "in_progress" | "done";
export interface task {
    "id": number;
    "title": string;
    "status": statuses;
    "list_id": number;
}
export declare const Tasks: Array<task>;
//# sourceMappingURL=data.d.ts.map