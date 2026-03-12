import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Data migration on upgrades (see migration module)

(with migration = Migration.run)
actor {
  // Authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  public type Profile = {
    name : Text;
    contactInfo : Text;
  };

  public type Item = {
    id : Nat;
    ownerPrincipal : Text;
    borrowerPrincipal : ?Text;
    category : Text;
    hashtag : Text;
    name : Text;
    description : Text;
    pricePerDay : ?Nat;
    pricePerMonth : ?Nat;
    location : Text;
  };

  public type BorrowRequest = {
    itemId : Nat;
    borrowerPrincipal : Text;
    status : RequestStatus;
    borrowTime : Nat;
  };

  public type RequestStatus = {
    #pending;
    #approved;
    #denied;
  };

  public type LostItem = {
    id : Nat;
    reporterPrincipal : Text;
    description : Text;
    lastSeenLocation : Text;
    contactInfo : Text;
    status : LostFoundStatus;
  };

  public type FoundItem = {
    id : Nat;
    finderPrincipal : Text;
    description : Text;
    pickUpLocation : Text;
    contactInfo : Text;
    receiver : ?Text;
    status : LostFoundStatus;
  };

  public type LostFoundStatus = {
    #active;
    #resolved;
  };

  module Item {
    public func compare(a : Item, b : Item) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module LostItem {
    public func compare(a : LostItem, b : LostItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  module FoundItem {
    public func compare(a : FoundItem, b : FoundItem) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  // App state
  var nextItemId = 20; // Initial items will use 0–19
  var nextLostFoundId = 0;

  let profiles = Map.empty<Principal, Profile>();
  let items = Map.empty<Nat, Item>();
  let borrowRequests = Map.empty<Nat, BorrowRequest>();
  let lostItems = Map.empty<Nat, LostItem>();
  let foundItems = Map.empty<Nat, FoundItem>();

  // Pre-populated demo items
  func getInitialItems() : Map.Map<Nat, Item> {
    let initialItems = Map.empty<Nat, Item>();
    let demoItems : [Item] = [
      {
        id = 0;
        ownerPrincipal = "hostel-buddy";
        borrowerPrincipal = null;
        category = "Books";
        hashtag = "all";
        name = "Engineering Drawing Textbook";
        description = "Comprehensive textbook for first-year engineering students covering basic and advanced concepts";
        pricePerDay = ?20;
        pricePerMonth = ?300;
        location = "Hostel B, Room 204";
      },
      {
        id = 1;
        ownerPrincipal = "textbook-expert";
        borrowerPrincipal = null;
        category = "Books";
        hashtag = "books";
        name = "DBMS Study Guide";
        description = "Concise guide for Database Management Systems with practice questions included";
        pricePerDay = ?15;
        pricePerMonth = ?270;
        location = "Hostel A, Block 3";
      },
      {
        id = 2;
        ownerPrincipal = "electrician";
        borrowerPrincipal = null;
        category = "Books";
        hashtag = "all";
        name = "Circuit Theory Reference Book";
        description = "Reference book for circuit theory concepts and solved problems";
        pricePerDay = ?18;
        pricePerMonth = ?300;
        location = "Hostel C, Floor 5";
      },
      {
        id = 3;
        ownerPrincipal = "data-geek";
        borrowerPrincipal = null;
        category = "Books";
        hashtag = "books";
        name = "Data Structures & Algorithms";
        description = "Comprehensive textbook on data structures and algorithm analysis. Paperback edition.";
        pricePerDay = ?25;
        pricePerMonth = ?350;
        location = "Hostel B, Room 107";
      },
      {
        id = 4;
        ownerPrincipal = "programmer";
        borrowerPrincipal = null;
        category = "Books";
        hashtag = "books";
        name = "C Programming Textbook";
        description = "Step-by-step guide to learning C programming language. Paperback.";
        pricePerDay = ?15;
        pricePerMonth = ?230;
        location = "Hostel D, Room 106";
      },
      {
        id = 5;
        ownerPrincipal = "calc-master";
        borrowerPrincipal = null;
        category = "Calculator";
        hashtag = "all";
        name = "Casio FX-991ES Plus";
        description = "Advanced scientific calculator with natural textbook display";
        pricePerDay = ?12;
        pricePerMonth = ?180;
        location = "Hostel A, Room 203";
      },
      {
        id = 6;
        ownerPrincipal = "math-wizard";
        borrowerPrincipal = null;
        category = "Calculator";
        hashtag = "electronics";
        name = "Texas Instruments TI-84";
        description = "Graphing calculator for advanced mathematics and statistics";
        pricePerDay = ?30;
        pricePerMonth = ?450;
        location = "Hostel C, Room 401";
      },
      {
        id = 7;
        ownerPrincipal = "physics-mate";
        borrowerPrincipal = null;
        category = "Calculator";
        hashtag = "all";
        name = "Casio Classwiz FX-570";
        description = "Scientific calculator ideal for Physics, Chemistry, and Engineering students";
        pricePerDay = ?10;
        pricePerMonth = ?150;
        location = "Hostel B, Room 305";
      },
      {
        id = 8;
        ownerPrincipal = "sports-fan";
        borrowerPrincipal = null;
        category = "Sports";
        hashtag = "all";
        name = "Cricket Bat";
        description = "Standard size cricket bat suitable for college tournaments";
        pricePerDay = ?25;
        pricePerMonth = ?350;
        location = "Hostel D, Sports Room";
      },
      {
        id = 9;
        ownerPrincipal = "sports-Enthusiast";
        borrowerPrincipal = null;
        category = "Sports";
        hashtag = "all";
        name = "Football";
        description = "Full-size football for games and practice sessions";
        pricePerDay = ?18;
        pricePerMonth = ?250;
        location = "Hostel A, Room 101";
      },
      {
        id = 10;
        ownerPrincipal = "shuttler";
        borrowerPrincipal = null;
        category = "Sports";
        hashtag = "all";
        name = "Badminton Racket";
        description = "Professional-grade badminton racket with grip and case";
        pricePerDay = ?22;
        pricePerMonth = ?320;
        location = "Hostel B, Room 213";
      },
      {
        id = 11;
        ownerPrincipal = "sportsman";
        borrowerPrincipal = null;
        category = "Sports";
        hashtag = "all";
        name = "Shuttle Cock Set";
        description = "Set of 6 shuttlecocks, suitable for indoor and outdoor matches";
        pricePerDay = ?10;
        pricePerMonth = ?100;
        location = "Hostel C, Recreation Area";
      },
      {
        id = 12;
        ownerPrincipal = "athlete";
        borrowerPrincipal = null;
        category = "Sports";
        hashtag = "all";
        name = "Volleyball";
        description = "Official size volleyball; suitable for tournaments and practice";
        pricePerDay = ?16;
        pricePerMonth = ?210;
        location = "Hostel D, Sports Room";
      },
      {
        id = 13;
        ownerPrincipal = "lab-gear";
        borrowerPrincipal = null;
        category = "Lab Equipment";
        hashtag = "all";
        name = "White Lab Coat Size M";
        description = "Standard white lab coat, size medium, for laboratory work";
        pricePerDay = ?6;
        pricePerMonth = ?70;
        location = "Hostel B, Room 209";
      },
      {
        id = 14;
        ownerPrincipal = "chemistry-enthusiast";
        borrowerPrincipal = null;
        category = "Lab Equipment";
        hashtag = "equipment";
        name = "White Lab Coat Size L";
        description = "Standard white lab coat, large size, suitable for science labs";
        pricePerDay = ?7;
        pricePerMonth = ?80;
        location = "Hostel A, Room 302";
      },
      {
        id = 15;
        ownerPrincipal = "shutterbug";
        borrowerPrincipal = null;
        category = "Electronics";
        hashtag = "all";
        name = "Nikon D3500 DSLR";
        description = "Entry-level digital SLR camera with lens kit included";
        pricePerDay = ?50;
        pricePerMonth = ?650;
        location = "Hostel C, Room 407";
      },
      {
        id = 16;
        ownerPrincipal = "videographer";
        borrowerPrincipal = null;
        category = "Electronics";
        hashtag = "all";
        name = "Tripod Stand";
        description = "Adjustable tripod stand for cameras and smartphones";
        pricePerDay = ?12;
        pricePerMonth = ?140;
        location = "Hostel D, Room 102";
      },
      {
        id = 17;
        ownerPrincipal = "study-buddy";
        borrowerPrincipal = null;
        category = "Hostel Essentials";
        hashtag = "all";
        name = "Study Lamp";
        description = "LED study lamp with adjustable brightness";
        pricePerDay = ?8;
        pricePerMonth = ?100;
        location = "Hostel A, Room 205";
      },
      {
        id = 18;
        ownerPrincipal = "techie";
        borrowerPrincipal = null;
        category = "Electronics";
        hashtag = "equipment";
        name = "USB Hub 4-Port";
        description = "USB hub with 4 ports compatible with variety of devices";
        pricePerDay = ?5;
        pricePerMonth = ?80;
        location = "Hostel B, Room 308";
      },
      {
        id = 19;
        ownerPrincipal = "hostel-plus";
        borrowerPrincipal = null;
        category = "Hostel Essentials";
        hashtag = "all";
        name = "Extension Board";
        description = "4-socket extension board, must-have for hostel rooms";
        pricePerDay = ?7;
        pricePerMonth = ?90;
        location = "Hostel D, Room 217";
      },
    ];
    for (item in demoItems.values()) { initialItems.add(item.id, item) };
    initialItems;
  };

  /// Save the caller's own profile. Requires #user role.
  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.name == "" or profile.contactInfo == "") {
      Runtime.trap("Name and contact information are required");
    };
    profiles.add(caller, profile);
  };

  /// Get the caller's own profile. Requires #user role.
  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
    };
    profiles.get(caller);
  };

  /// Get any user's profile. Caller must be the same user or an admin.
  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  // ─── Borrow History ───────────────────────────────────────────────────────

  /// Get borrow history for a given principal text. Caller must own that identity or be admin.
  public query ({ caller }) func getUserBorrowingHistory(userPrincipal : Text) : async [BorrowRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view borrowing history");
    };
    let callerText = caller.toText();
    if (callerText != userPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own borrowing history");
    };
    borrowRequests.values().toArray().filter(
      func(request) { request.borrowerPrincipal == userPrincipal }
    );
  };

  // ─── Item Queries (public browsing, no auth required) ────────────────────

  public query func getAvailableItems() : async [Item] {
    let availableItems = items.values().toArray().filter(
      func(item) {
        switch (item.borrowerPrincipal) {
          case (null) { true };
          case (_) { false };
        };
      }
    );
    availableItems.sort();
  };

  public query func getAllItems() : async [Item] {
    items.values().toArray().sort();
  };

  public query func filterItemsByCategory(category : Text) : async [Item] {
    let filteredItems = items.values().toArray().filter(
      func(item) { item.category == category }
    );
    filteredItems.sort();
  };

  public query func searchItemsByName(searchTerm : Text) : async [Item] {
    let filteredItems = items.values().toArray().filter(
      func(item) { item.name.toLower().contains(#text(searchTerm.toLower())) }
    );
    filteredItems.sort();
  };

  public query func filterItemsByHashtag(hashtag : Text) : async [Item] {
    let filteredItems = items.values().toArray().filter(
      func(item) { item.hashtag == hashtag }
    );
    filteredItems.sort();
  };

  public query func getItemsByOwner(ownerPrincipal : Text) : async [Item] {
    let filteredItems = items.values().toArray().filter(
      func(item) { item.ownerPrincipal == ownerPrincipal }
    );
    filteredItems.sort();
  };

  /// Get items currently borrowed by a specific user.
  /// Caller must be that user or an admin to protect borrowing privacy.
  public query ({ caller }) func getItemsByBorrower(borrowerPrincipal : Text) : async [Item] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view borrowed items");
    };
    let callerText = caller.toText();
    if (callerText != borrowerPrincipal and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own borrowed items");
    };
    let filteredItems = items.values().toArray().filter(
      func(item) {
        switch (item.borrowerPrincipal) {
          case (?b) { b == borrowerPrincipal };
          case (null) { false };
        };
      }
    );
    filteredItems.sort();
  };

  // ─── Item Mutations ───────────────────────────────────────────────────────

  public shared ({ caller }) func addItem(
    category : Text,
    hashtag : Text,
    name : Text,
    description : Text,
    pricePerDay : ?Nat,
    pricePerMonth : ?Nat,
    location : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can list items");
    };
    let id = nextItemId;
    nextItemId += 1;
    let newItem : Item = {
      id;
      ownerPrincipal = caller.toText();
      borrowerPrincipal = null;
      category;
      hashtag;
      name;
      description;
      pricePerDay;
      pricePerMonth;
      location;
    };
    items.add(id, newItem);
    id;
  };

  public shared ({ caller }) func createBorrowRequest(itemId : Nat, borrowTime : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create borrow requests");
    };

    switch (items.get(itemId)) {
      case (null) { Runtime.trap("Item not found") };
      case (?item) {
        if (item.borrowerPrincipal != null) {
          Runtime.trap("Item is already borrowed");
        };
        let callerText = caller.toText();
        if (item.ownerPrincipal == callerText) {
          Runtime.trap("Cannot borrow your own item");
        };
        let borrowRequest : BorrowRequest = {
          itemId;
          borrowerPrincipal = callerText;
          status = #pending;
          borrowTime;
        };
        borrowRequests.add(itemId, borrowRequest);
      };
    };
  };

  public shared ({ caller }) func updateBorrowRequestStatus(itemId : Nat, newStatus : RequestStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage borrow requests");
    };
    switch (items.get(itemId)) {
      case (null) { Runtime.trap("Item not found") };
      case (?item) {
        let callerText = caller.toText();
        if (item.ownerPrincipal != callerText and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the item owner can approve or deny requests");
        };
        switch (borrowRequests.get(itemId)) {
          case (null) { Runtime.trap("Borrow request not found") };
          case (?req) {
            let updatedReq : BorrowRequest = { req with status = newStatus };
            borrowRequests.add(itemId, updatedReq);
            switch (newStatus) {
              case (#approved) {
                items.add(itemId, { item with borrowerPrincipal = ?req.borrowerPrincipal });
              };
              case (_) {};
            };
          };
        };
      };
    };
  };

  // ─── Lost & Found ─────────────────────────────────────────────────────────

  public query func getLostItems() : async [LostItem] {
    lostItems.values().toArray().sort();
  };

  public query func getFoundItems() : async [FoundItem] {
    foundItems.values().toArray().sort();
  };

  public shared ({ caller }) func addLostItem(
    description : Text,
    lastSeenLocation : Text,
    contactInfo : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can post lost item reports");
    };
    let id = nextLostFoundId;
    nextLostFoundId += 1;
    let lostItem : LostItem = {
      id;
      reporterPrincipal = caller.toText();
      description;
      lastSeenLocation;
      contactInfo;
      status = #active;
    };
    lostItems.add(id, lostItem);
    id;
  };

  public shared ({ caller }) func addFoundItem(
    description : Text,
    pickUpLocation : Text,
    contactInfo : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can post found item reports");
    };
    let id = nextLostFoundId;
    nextLostFoundId += 1;
    let foundItem : FoundItem = {
      id;
      finderPrincipal = caller.toText();
      description;
      pickUpLocation;
      contactInfo;
      receiver = null;
      status = #active;
    };
    foundItems.add(id, foundItem);
    id;
  };

  public shared ({ caller }) func resolveLostItem(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can resolve lost item reports");
    };
    switch (lostItems.get(id)) {
      case (null) { Runtime.trap("Lost item report not found") };
      case (?lostItem) {
        let callerText = caller.toText();
        if (lostItem.reporterPrincipal != callerText and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the reporter or an admin can resolve this report");
        };
        lostItems.add(id, { lostItem with status = #resolved });
      };
    };
  };

  public shared ({ caller }) func resolveFoundItem(id : Nat, receiver : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can resolve found item reports");
    };
    switch (foundItems.get(id)) {
      case (null) { Runtime.trap("Found item report not found") };
      case (?foundItem) {
        let callerText = caller.toText();
        if (foundItem.finderPrincipal != callerText and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the finder or an admin can resolve this report");
        };
        foundItems.add(id, { foundItem with status = #resolved; receiver = ?receiver });
      };
    };
  };
};

