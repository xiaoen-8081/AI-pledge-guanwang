import type { AlovaGenerics, Method } from 'alova'
import type { PaginationHookConfig } from 'alova/client'
import type { PaginationProps } from 'naive-ui'

export function usePaginatedRequest<AG extends AlovaGenerics, ListData extends unknown[], Args extends any[]>(
  methodHandler: (page: number, pageSize: number, ...args: Args) => Method<AG>,
  config: PaginationHookConfig<AG, ListData> = {},
) {
  const { loading, page, data, pageSize, total, send, reload, refresh } = usePagination(
    methodHandler,
    {
      immediate: false,
      total: res => res.totalCount,
      preloadNextPage: false,
      preloadPreviousPage: false,
      initialData: { data: [], total: 0 },
      // middleware: async (_, next) => {
      //   const { loading } = _.proxyStates
      //   _.controlLoading()
      //   loading.v = true
      //   await new Promise<void>((resolve) => {
      //     // setTimeout(() => {
      //     resolve()
      //     // }, 1500)
      //   })
      //   await to(next())
      //   loading.v = false
      // },
      ...config,
    },
  ).onError(() => {
    data.value = []
  })
  const { width } = useWindowSize()
  // 分页
  const pagination = computed<PaginationProps | undefined>(() => {
    if (total.value < 10)
      return undefined
    return {
      page: page.value,
      pageSize: pageSize.value,
      showSizePicker: true,
      itemCount: total.value || 0,
      pageSizes: [10, 30, 50, 100],
      pageSlot: width.value > 768 ? 6 : 4,
      onChange: (pageNum) => {
        page.value = pageNum
      },
      onUpdatePageSize: (size) => {
        pageSize.value = size
      },
    }
  })

  return { loading, data, page, pageSize, total, send, reload, refresh, pagination } as const
}
