export const titleListLocalMap = {
  billCode: {
    id: 1,
    title: "是",
    dataIndex: "billCode",
    width: 100,
  },
  traceLast: {
    id: 2,
    title: "追",
    dataIndex: "traceLast",
    width: 100,
  },
  demandDescription: {
    id: 3,
    title: "逐",
    dataIndex: "demandDescription",
    width: 100,
  },
  demandTicketTypeStr: {
    id: 4,
    title: "梦",
    dataIndex: "demandTicketTypeStr",
    width: 100,
  },
  merchantName: {
    id: 5,
    title: "想",
    dataIndex: "merchantName",
    width: 100,
  },
  statusStr: {
    id: 6,
    title: "的",
    dataIndex: "statusStr",
    width: 100,
  },
  createTime: {
    id: 7,
    title: "二",
    dataIndex: "createTime",
    width: 100,
  },
  modifiedTime: {
    id: 8,
    title: "狗",
    dataIndex: "modifiedTime",
    width: 100,
  },
  customerStaffName: {
    id: 9,
    title: "子",
    dataIndex: "customerStaffName",
    width: 100,
  },
};
export const titleListLocal = [
  "billCode",
  "traceLast",
  "demandDescription",
  "demandTicketTypeStr",
  "merchantName",
  "statusStr",
  "createTime",
  "modifiedTime",
  "customerStaffName",
];
export const tableList = (remoteData = []) => {
  // 接口只返回被勾选的，如果全量返回并且区分是否勾选 需要自行设计数据处理
  const remoteChecked = remoteData
    .filter((item) => {
      if (titleListLocal.includes(item)) {// 保证按照远程拉过来的顺序 ，所以用remoteData遍历
        return true;
      }
    })
    .map((item) => {
      return { ...titleListLocalMap[item] };
    });
  return [...remoteChecked];
};
