export default {
  data() {
    return {
      // 列表页还是详情页, 决定了query里面要不要带page信息和many
      isListView: true,
      // 默认的分页信息
      defaultPageInfo: {
        page: 1,
        many: true,
        page_size: 20
      },
      queryDefault: {},
      query: {},
      // 固定的必带参数, 不会显示在url中
      extra_query: {},
      // 分页的总页数, 在请求访问后更新
      pageCount: null,
      // 请求返回值
      responseData: {},
      // http请求函数, 返回一个Promise
      fetchDataFunction: function() {
        return new Promise(function(resolve, reject) {
          resolve(null)
        })
      },
      allowFetchDataErrorDisplay: true,
      loading: false
    }
  },
  computed: {
    // 去掉query中为空的项, 且按需加入分页信息
    filteredQuery() {
      function canAddToQuery(value) {
        const ignoredValue = [null, '', undefined]
        return ignoredValue.indexOf(value) === -1
      }
      const newQuery = {}
      if (this.isListView) {
        for (const key in this.defaultPageInfo) {
          if (canAddToQuery(this.defaultPageInfo[key])) {
            newQuery[key] = this.defaultPageInfo[key]
          }
        }
      }

      for (const key in this.queryDefault) {
        if (canAddToQuery(this.queryDefault[key])) {
          newQuery[key] = this.queryDefault[key]
        }
      }

      for (const key in this.query) {
        if (canAddToQuery(this.query[key])) {
          newQuery[key] = this.query[key]
        }
      }

      return newQuery
    },
    tablePageData() {
      if (Array.isArray(this.responseData)) {
        return this.responseData
      } else if (this.responseData.results) {
        return this.responseData.results
      } else {
        return []
      }
    }
  },
  methods: {
    canAddToQuery(value) {
      const ignoredValue = [null, '', undefined]
      return ignoredValue.indexOf(value) === -1
    },
    // 从url中初始化, 在router的钩子函数中被调用
    initFromUrl(to, from) {
      this.query = {}
      for (const key in to.query) {
        this.$set(this.query, key, to.query[key])
      }
      this.fetchData()
    },
    // 获取数据, 调用http函数, 获取数据后将结果数据放入this.responseData
    fetchData() {
      this.loading = true
      this.fetchDataFunction(
        Object.assign({}, this.filteredQuery, this.extra_query)
      ).then(response => {
        this.loading = false
        if (response && response.data) {
          this.resolveData(response.data)
        }
      }).catch(err => {
        this.loading = false
        if (!this.allowFetchDataErrorDisplay) return
        this.resolveError(err)
      })
    },
    // 解析返回的data, 目前常用的返回格式(均为成功返回)
    // 1, 不含error_code和error_reason, {a:1,b:2}
    // 2, {error_code:0, error_reason:'成功', data:{a:1,b:2}}
    // 可覆盖该方法实现支持特殊的格式
    resolveData(data) {
      if (data.data && data.error_code === 0) {
        this.responseData = data.data
      } else {
        this.responseData = data
      }
      this.pageCount = Math.max(
        Math.ceil(
          Number(this.responseData.count) /
            Number(this.filteredQuery.page_size)
        ),
        1
      )
    },
    // 覆盖该方法支持特殊error的display
    resolveError(err) {
      if (err.response.data.error_code > 1000) {
        this.$snotify.error(err.response.data.error_reason)
      } else {
        this.$snotify.error('请求出错')
      }
    },
    // 更新url, 并跳转到新的url页面, 跳转后通过initFromUrl来渲染新页面
    refreshUrlFromQuery(keepPage) {
      const _ = this.$route
      // 如果查询条件更改, 那么不应该保留page
      if (!keepPage) {
        this.$delete(this.query, 'page')
        this.$router.replace({
          name: _.name,
          params: _.params,
          query: this.filteredQuery
        })
      } else {
        this.$router.replace({
          name: _.name,
          params: _.params,
          query: { ..._.query, page: this.query.page }
        })
      }
      if (this.$refs['scrollContent']) {
        this.$refs.scrollContent.scrollTop = 0
      }
    },
    // 更改页面, 保留page信息
    changePage(event) {
      this.$set(this.query, 'page', event)
      this.refreshUrlFromQuery(true)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.initFromUrl(to, from)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.initFromUrl(to, from)
    document.activeElement.blur()
    next()
  }
}
