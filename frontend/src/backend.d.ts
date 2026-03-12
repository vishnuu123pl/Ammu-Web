import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Item {
    id: bigint;
    hashtag: string;
    ownerPrincipal: string;
    name: string;
    description: string;
    pricePerDay?: bigint;
    borrowerPrincipal?: string;
    category: string;
    pricePerMonth?: bigint;
    location: string;
}
export interface BorrowRequest {
    status: RequestStatus;
    itemId: bigint;
    borrowTime: bigint;
    borrowerPrincipal: string;
}
export interface FoundItem {
    id: bigint;
    status: LostFoundStatus;
    finderPrincipal: string;
    contactInfo: string;
    description: string;
    receiver?: string;
    pickUpLocation: string;
}
export interface Profile {
    contactInfo: string;
    name: string;
}
export interface LostItem {
    id: bigint;
    status: LostFoundStatus;
    contactInfo: string;
    description: string;
    reporterPrincipal: string;
    lastSeenLocation: string;
}
export enum LostFoundStatus {
    resolved = "resolved",
    active = "active"
}
export enum RequestStatus {
    pending = "pending",
    denied = "denied",
    approved = "approved"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFoundItem(description: string, pickUpLocation: string, contactInfo: string): Promise<bigint>;
    addItem(category: string, hashtag: string, name: string, description: string, pricePerDay: bigint | null, pricePerMonth: bigint | null, location: string): Promise<bigint>;
    addLostItem(description: string, lastSeenLocation: string, contactInfo: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBorrowRequest(itemId: bigint, borrowTime: bigint): Promise<void>;
    filterItemsByCategory(category: string): Promise<Array<Item>>;
    filterItemsByHashtag(hashtag: string): Promise<Array<Item>>;
    getAllItems(): Promise<Array<Item>>;
    getAvailableItems(): Promise<Array<Item>>;
    /**
     * / Get the caller's own profile. Requires #user role.
     */
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFoundItems(): Promise<Array<FoundItem>>;
    /**
     * / Get items currently borrowed by a specific user.
     * / Caller must be that user or an admin to protect borrowing privacy.
     */
    getItemsByBorrower(borrowerPrincipal: string): Promise<Array<Item>>;
    getItemsByOwner(ownerPrincipal: string): Promise<Array<Item>>;
    getLostItems(): Promise<Array<LostItem>>;
    /**
     * / Get borrow history for a given principal text. Caller must own that identity or be admin.
     */
    getUserBorrowingHistory(userPrincipal: string): Promise<Array<BorrowRequest>>;
    /**
     * / Get any user's profile. Caller must be the same user or an admin.
     */
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    resolveFoundItem(id: bigint, receiver: string): Promise<void>;
    resolveLostItem(id: bigint): Promise<void>;
    /**
     * / Save the caller's own profile. Requires #user role.
     */
    saveCallerUserProfile(profile: Profile): Promise<void>;
    searchItemsByName(searchTerm: string): Promise<Array<Item>>;
    updateBorrowRequestStatus(itemId: bigint, newStatus: RequestStatus): Promise<void>;
}
