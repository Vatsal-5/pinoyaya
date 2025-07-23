export const DAY_FILTER = [
  {
    label: "Today",
    value: "Today",
    dates: new Date(),
  },
  {
    label: "Yesterday",
    value: "Yesterday",
    dates: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    label: "Last 7 Days",
    value: "Last 7 Days",
    dates: {
      start: new Date(new Date().setDate(new Date().getDate() - 6)),
      end: new Date(),
    },
  },
  {
    label: "Last 30 Days",
    value: "Last 30 Days",
    dates: {
      start: new Date(new Date().setDate(new Date().getDate() - 29)),
      end: new Date(),
    },
  },
  {
    label: "This Month",
    value: "This Month",
    dates: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date(),
    },
  },
  {
    label: "Last Month",
    value: "Last Month",
    dates: {
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    },
  },
];

export const LIMIT = [10, 25, 50, 100]

export const ROLES = ["Caregiver", "Family"]

export const PAGINATION = {
  page: 1,
  limit: 10
}