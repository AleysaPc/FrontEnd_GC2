export const buildParams = ({
    page = 1,
    per_page = 10,
    search = "",
    filters = {},
    all_data = false,
    ordering = "",
  }) => ({
      ...filters,
      ...(search ? { search } : {}),
      ...(ordering ? { ordering } : {}),
      page,
      per_page,
      ...(all_data ? { all_data: true } : {}),
  });
  