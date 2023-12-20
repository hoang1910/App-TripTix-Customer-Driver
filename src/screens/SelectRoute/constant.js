export const data = [
  {
    idTrip: 46861,
    idRoute: 1,
    idDriver: 7,
    idBus: 69587,
    idStaff: 6,
    fare: 300, // giá vé
    availableSeat: 6, // số ghế trống
    bookedSeat: 0,
    status: "READY",
    startTime: "15-10-2023 06:00:00",
    endTime: "15-10-2023 14:00:00",
    averageStar: 0, // đánh giá
    adminCheck: "PENDING",
    createdDate: "Thu Oct 12 17:29:53 ICT 2023",
    updatedDate: "Thu Oct 12 17:29:53 ICT 2023",
    routeDTO: {
      // thông tin tuyến
      idRoute: 1,
      idAdmin: 1,
      createdDate: "Thu Oct 12 17:20:24 ICT 2023",
      updatedDate: "Thu Oct 12 17:20:24 ICT 2023",
      departurePoint: "Hồ Chí Minh",
      destination: "Lâm Đồng",
      region: "Hỗn hợp",
      distance: 320, // khoảng cách
      baseFare: 280,
      status: "ACTIVE",
    },
    driverDTO: {
      // thông tin tài xế
      idUserSystem: 7,
      phone: "6697637605",
      fullName: "Driver",
      voucherCoins: 0,
      address: "string",
      birthday: "2023-10-09",
      gender: "MALE",
      email: "driver@g.l",
      createdDate: "Thu Oct 12 17:25:13 ICT 2023",
      updatedDate: "Thu Oct 12 17:25:13 ICT 2023",
      citizenIdentityCard: "10556180156",
      assignedRegions: null,
      status: "ACTIVE",
      role: "ROLE_DRIVER",
    },
    busDTO: {
      // thông tin xe
      idBus: 69587,
      name: "Xe Thành Công 4",
      licensePlates: "ABC-123459",
      type: "LIMOUSINE",
      description: "xe có máy lạnh, chỗ ngồi thoải mái",
      capacity: 6, // số ghế
      inspectionDate: "2024-12-12", // ngày kiểm định
      status: "ACTIVE",
      createdDate: "Thu Oct 12 17:12:40 ICT 2023",
      updatedDate: "Thu Oct 12 17:12:40 ICT 2023",
      imgLink: null,
    },
    staffDTO: {
      // người tạo chuyến
      idUserSystem: 6,
      phone: "6697637604",
      fullName: "Staff Hỗn Hợp",
      voucherCoins: 0,
      address: "string",
      birthday: "2023-10-09",
      gender: "MALE",
      email: "staffHonhop@g.l",
      createdDate: "Thu Oct 12 17:17:50 ICT 2023",
      updatedDate: "Thu Oct 12 17:17:50 ICT 2023",
      citizenIdentityCard: "10556180155",
      assignedRegions: "Hỗn hợp",
      status: "ACTIVE",
      role: "ROLE_STAFF",
    },
    listtripStopDTO: [
      // danh sách điểm dừng
      {
        idStation: 1,
        type: "PICKUP", // điểm đón (PICKUP) | điểm trả (DROPOFF)
        timeComes: "06:00:00",
        stationDTO: {
          idStation: 1,
          name: "Trạm Xe Tham Lương",
          address: "24 Tham Lương, Phường Hiệp Thành, Quận 12, TP Hồ Chí Minh",
          province: "Hồ Chí Minh",
          status: "ACTIVE",
          createdDate: "Thu Oct 12 17:13:45 ICT 2023",
          updatedDate: "Thu Oct 12 17:13:45 ICT 2023",
        },
      },
      {
        idStation: 2,
        type: "PICKUP",
        timeComes: "06:30:00",
        stationDTO: {
          idStation: 2,
          name: "Trạm Xe Công Cộng Tân Đình",
          address:
            "102A Điện Biên Phủ, Phường Tân Đình, Quận 1, TP Hồ Chí Minh",
          province: "Hồ Chí Minh",
          status: "ACTIVE",
          createdDate: "Thu Oct 12 17:13:53 ICT 2023",
          updatedDate: "Thu Oct 12 17:13:53 ICT 2023",
        },
      },
      {
        idStation: 6,
        type: "PICKUP",
        timeComes: "07:00:00",
        stationDTO: {
          idStation: 6,
          name: "Trạm Xe Công Cộng Bình Dương",
          address:
            "123 Nguyễn Đình Chính, Phường Phú Thọ, Thành phố Thủ Dầu Một, Bình Dương",
          province: "Bình Dương",
          status: "ACTIVE",
          createdDate: "Thu Oct 12 17:14:21 ICT 2023",
          updatedDate: "Thu Oct 12 17:14:21 ICT 2023",
        },
      },
      {
        idStation: 7,
        type: "DROPOFF",
        timeComes: "14:00:00",
        stationDTO: {
          idStation: 7,
          name: "Trạm Xe Công Cộng Lâm Đồng",
          address: "76 Đinh Công Tráng, Phường 1, Thành phố Đà Lạt, Lâm Đồng",
          province: "Lâm Đồng",
          status: "ACTIVE",
          createdDate: "Thu Oct 12 17:14:27 ICT 2023",
          updatedDate: "Thu Oct 12 17:14:27 ICT 2023",
        },
      },
    ],
  },
];
