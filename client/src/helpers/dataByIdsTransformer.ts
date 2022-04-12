export default function transformDataByIds(data: any) {
  return data.reduce(
    (acc: any, curr: any) => ({ ...acc, [curr.id]: curr }),
    {}
  );
}
