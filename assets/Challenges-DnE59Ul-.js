import{r,j as s}from"./vendor-react-C3urONmb.js";import{S as i}from"./styles-Da9UsKNw.js";import{L as n}from"./vendor-router-Ba1p3P8-.js";const l="/interview/projects/course-commerce-platform/zh",d=`<span class="c-kw">const</span> CouponListBefore = () =&gt; {
  <span class="c-cm">// 筛选表单状态</span>
  <span class="c-kw">const</span> [params, setParams] = useState({ name: <span class="c-str">''</span>, status: <span class="c-kw">undefined</span> })
  <span class="c-cm">// 列表数据</span>
  <span class="c-kw">const</span> [dataSource, setDataSource] = useState([])
  <span class="c-kw">const</span> [loading, setLoading] = useState(<span class="c-kw">false</span>)
  <span class="c-cm">// 分页状态</span>
  <span class="c-kw">const</span> [pagination, setPagination] = useState({ current: 1, pageSize: 20, total: 0 })

  <span class="c-cm">// 请求函数</span>
  <span class="c-kw">const</span> <span class="c-fn">fetchData</span> = <span class="c-kw">async</span> (p = params, pg = pagination) =&gt; {
    setLoading(<span class="c-kw">true</span>)
    <span class="c-kw">try</span> {
      <span class="c-kw">const</span> res = <span class="c-kw">await</span> <span class="c-fn">getCouponList</span>({ ...p, page: pg.current, size: pg.pageSize })
      setDataSource(res.list)
      setPagination({ ...pg, total: res.total })
    } <span class="c-kw">finally</span> { setLoading(<span class="c-kw">false</span>) }
  }

  <span class="c-cm">// 初次加载</span>
  useEffect(() =&gt; { <span class="c-fn">fetchData</span>() }, [])

  <span class="c-cm">// 搜索：回到第一页</span>
  <span class="c-kw">const</span> <span class="c-fn">handleSearch</span> = () =&gt; <span class="c-fn">fetchData</span>(params, { ...pagination, current: 1 })
  <span class="c-cm">// 重置：清空筛选 + 回到第一页</span>
  <span class="c-kw">const</span> <span class="c-fn">handleReset</span> = () =&gt; {
    <span class="c-kw">const</span> empty = { name: <span class="c-str">''</span>, status: <span class="c-kw">undefined</span> }
    setParams(empty)
    <span class="c-fn">fetchData</span>(empty, { ...pagination, current: 1 })
  }
  <span class="c-cm">// 翻页：保留筛选</span>
  <span class="c-kw">const</span> <span class="c-fn">handleChange</span> = (pg) =&gt; <span class="c-fn">fetchData</span>(params, pg)

  <span class="c-cm">// ... 还有 column 持久化、批量操作、权限按钮 等等 200+ 行</span>

  <span class="c-kw">return</span> (
    &lt;&gt;
      &lt;<span class="c-prop">Form</span>&gt;...搜索字段 JSX...&lt;/<span class="c-prop">Form</span>&gt;
      &lt;<span class="c-prop">Table</span> dataSource={dataSource} pagination={pagination} loading={loading} onChange={handleChange} /&gt;
    &lt;/&gt;
  )
}`,t=`<span class="c-kw">const</span> COLUMNS = [
  { title: <span class="c-str">'优惠券名称'</span>, dataIndex: <span class="c-str">'name'</span> },
  { title: <span class="c-str">'状态'</span>, dataIndex: <span class="c-str">'status'</span>, render: renderStatus },
  { title: <span class="c-str">'操作'</span>, render: (_, row) =&gt; &lt;<span class="c-prop">TableOperationDropdown</span> actions={getActions(row)} /&gt; },
]

<span class="c-kw">const</span> SEARCH_FIELDS = [
  { name: <span class="c-str">'name'</span>, label: <span class="c-str">'名称'</span>, component: <span class="c-str">'Input'</span> },
  { name: <span class="c-str">'status'</span>, label: <span class="c-str">'状态'</span>, component: <span class="c-str">'Select'</span>, options: STATUS_OPTIONS },
]

<span class="c-kw">const</span> CouponListAfter = () =&gt; {
  <span class="c-cm">// 一行 hook 搞定筛选 + 分页 + 请求时机 + loading</span>
  <span class="c-kw">const</span> { tableProps, searchFormProps } = <span class="c-fn">useTableSearch</span>({
    searchFn: getCouponList,
    defaultParams: { status: <span class="c-str">'active'</span> },
  })

  <span class="c-cm">// 列显隐持久化到 localStorage</span>
  <span class="c-kw">const</span> { finalColumns, columnSetter } = <span class="c-fn">useTableSet</span>(COLUMNS, <span class="c-str">'coupon-list'</span>)

  <span class="c-kw">return</span> (
    &lt;&gt;
      &lt;<span class="c-prop">FormSearchGroup</span> fields={SEARCH_FIELDS} {...searchFormProps} /&gt;
      &lt;<span class="c-prop">Table</span> columns={finalColumns} {...tableProps} /&gt;
    &lt;/&gt;
  )
}`,p=`<span class="c-kw">const</span> CouponListPage = () =&gt; {
  <span class="c-kw">const</span> { userInfo } = useUserContext()

  <span class="c-cm">// 菜单权限（其实进都进不来应该就看不到，但以防万一）</span>
  <span class="c-kw">if</span> (!userInfo.menus.includes(<span class="c-str">'gift-virtual-goods-coupon'</span>)) {
    <span class="c-kw">return</span> &lt;<span class="c-prop">NoAccessible</span> /&gt;
  }

  <span class="c-cm">// 按钮权限散落在各处</span>
  <span class="c-kw">const</span> canEdit = userInfo.functions.includes(<span class="c-str">'coupon-edit'</span>)
  <span class="c-kw">const</span> canDelete = userInfo.functions.includes(<span class="c-str">'coupon-delete'</span>)
  <span class="c-kw">const</span> canPublish = userInfo.functions.includes(<span class="c-str">'coupon-publish'</span>)

  <span class="c-kw">return</span> (
    &lt;&gt;
      {canEdit &amp;&amp; &lt;<span class="c-prop">Button</span>&gt;编辑&lt;/<span class="c-prop">Button</span>&gt;}
      {canDelete &amp;&amp; &lt;<span class="c-prop">Button</span>&gt;删除&lt;/<span class="c-prop">Button</span>&gt;}
      {canPublish &amp;&amp; &lt;<span class="c-prop">Button</span>&gt;发布&lt;/<span class="c-prop">Button</span>&gt;}
    &lt;/&gt;
  )
}
<span class="c-cm">// 想一想：20+ 页面都这样写，权限字符串散落在几百个文件里。</span>`,o=`<span class="c-cm">// 1) access.ts — 权限字符串只在这里出现一次</span>
<span class="c-kw">export default</span> (initialState) =&gt; {
  <span class="c-kw">const</span> { menus, functions } = initialState
  <span class="c-kw">return</span> {
    <span class="c-cm">// 菜单级</span>
    canSeePresentCoupon: menus.includes(<span class="c-str">'gift-virtual-goods-coupon'</span>),
    canSeeWorkspace: menus.includes(<span class="c-str">'workspace'</span>),
    <span class="c-cm">// ... 50+ 个菜单开关</span>
    functions,
  }
}

<span class="c-cm">// 2) 路由级 — routes/index.ts</span>
{
  name: <span class="c-str">'优惠券'</span>,
  path: <span class="c-str">'/present/virtualGoods/coupon'</span>,
  component: <span class="c-str">'./present/coupon'</span>,
  access: <span class="c-str">'canSeePresentCoupon'</span>, <span class="c-cm">// ← Umi Max 自动拦截 + 菜单隐藏</span>
}

<span class="c-cm">// 3) 页面级 — 业务组件外层</span>
<span class="c-kw">const</span> Page = () =&gt; {
  <span class="c-kw">const</span> access = <span class="c-fn">useAccess</span>()
  <span class="c-kw">return</span> (
    &lt;<span class="c-prop">Access</span> accessible={access.canSeePresentCoupon} fallback={&lt;<span class="c-prop">NoAccessible</span> /&gt;}&gt;
      &lt;<span class="c-prop">CouponList</span> /&gt;
    &lt;/<span class="c-prop">Access</span>&gt;
  )
}

<span class="c-cm">// 4) 按钮级 — 自封装的 hook</span>
<span class="c-kw">const</span> Toolbar = () =&gt; {
  <span class="c-kw">const</span> canEdit = <span class="c-fn">useAuthCheck</span>(<span class="c-str">'coupon-edit'</span>)
  <span class="c-kw">const</span> canDelete = <span class="c-fn">useAuthCheck</span>(<span class="c-str">'coupon-delete'</span>)
  <span class="c-kw">return</span> (
    &lt;&gt;
      {canEdit &amp;&amp; &lt;<span class="c-prop">Button</span>&gt;编辑&lt;/<span class="c-prop">Button</span>&gt;}
      {canDelete &amp;&amp; &lt;<span class="c-prop">Button</span>&gt;删除&lt;/<span class="c-prop">Button</span>&gt;}
    &lt;/&gt;
  )
}`,m=`<span class="c-cm">// utils/axios.ts</span>
<span class="c-kw">const</span> instance = axios.create({
  baseURL: config.host,
  timeout: 15000,
  withCredentials: <span class="c-kw">true</span>,
  headers: process.env.NODE_ENV !== <span class="c-str">'production'</span> ? { isDebug: 1 } : {},
})

<span class="c-cm">// —— 请求拦截器：注入 token</span>
instance.interceptors.request.use((conf) =&gt; {
  conf.headers = { ...conf.headers, Authorization: <span class="c-fn">getToken</span>() }
  <span class="c-kw">return</span> conf
})

<span class="c-cm">// —— 响应拦截器：剥壳 + 业务错误 + 401 跳 SSO</span>
instance.interceptors.response.use(
  (response) =&gt; {
    <span class="c-cm">// 401：token 过期</span>
    <span class="c-kw">if</span> (response.data?.code === 401) {
      message.<span class="c-fn">error</span>(<span class="c-str">'用户未登录'</span>)
      <span class="c-kw">return</span> response.data.data
    }
    <span class="c-cm">// 业务错误（约定 stat=1 才算成功）</span>
    <span class="c-kw">if</span> (response.data?.stat !== 1) {
      message.<span class="c-fn">error</span>(response.data?.msg || <span class="c-str">'内部错误'</span>)
      <span class="c-kw">return</span> Promise.<span class="c-fn">reject</span>(response.data)
    }
    <span class="c-cm">// 成功：剥壳返回 data.data —— 业务代码直接拿业务数据</span>
    <span class="c-kw">return</span> response.data.data
  },
  (error) =&gt; {
    <span class="c-kw">if</span> (error?.response?.status === 401) {
      <span class="c-cm">// token 过期：清 token + 跳 SSO logout，带 redirect_url 回跳</span>
      message.<span class="c-fn">error</span>({
        content: <span class="c-str">'登录已过期，请重新登录'</span>,
        onClose: () =&gt; {
          <span class="c-fn">postLogout</span>().<span class="c-fn">then</span>((res) =&gt; {
            <span class="c-fn">clearToken</span>()
            window.location.href = <span class="c-str">\`\${ssoLogout}?path=\${encodeURIComponent(res.redirectUrl)}\`</span>
          })
        },
      })
    } <span class="c-kw">else</span> {
      message.<span class="c-fn">error</span>(<span class="c-str">'系统异常'</span>)
      <span class="c-kw">return</span> Promise.<span class="c-fn">reject</span>(error)
    }
  },
)`,h=`<span class="c-cm">// 类型通过 Swagger 自动生成</span>
<span class="c-kw">const</span> Page = () =&gt; {
  <span class="c-kw">const</span> [user, setUser] = useState&lt;UserInfo&gt;()

  useEffect(() =&gt; {
    <span class="c-cm">// 一行 —— 成功拿数据，失败已经弹过 toast，401 已经自动跳 SSO</span>
    <span class="c-fn">getUserInfo</span>().<span class="c-fn">then</span>(setUser)
  }, [])

  <span class="c-kw">return</span> &lt;<span class="c-prop">div</span>&gt;{user?.name}&lt;/<span class="c-prop">div</span>&gt;
}`,x=`<span class="c-kw">const</span> RuleFormBefore = () =&gt; {
  <span class="c-kw">const</span> [form] = Form.<span class="c-fn">useForm</span>()
  <span class="c-kw">const</span> [subOptions, setSubOptions] = useState([])

  <span class="c-cm">// 监听 type 变化，更新 subType 的选项</span>
  useEffect(() =&gt; {
    <span class="c-kw">const</span> type = form.<span class="c-fn">getFieldValue</span>(<span class="c-str">'type'</span>)
    <span class="c-kw">if</span> (!type) <span class="c-kw">return</span>
    <span class="c-fn">fetchSubOptions</span>(type).<span class="c-fn">then</span>((opts) =&gt; {
      setSubOptions(opts)
      form.<span class="c-fn">setFieldValue</span>(<span class="c-str">'subType'</span>, <span class="c-kw">undefined</span>) <span class="c-cm">// 清空 subType</span>
    })
  }, [form.<span class="c-fn">getFieldValue</span>(<span class="c-str">'type'</span>)])

  <span class="c-cm">// 监听 subType 变化，控制 detail 字段是否显示</span>
  <span class="c-kw">const</span> subType = Form.<span class="c-fn">useWatch</span>(<span class="c-str">'subType'</span>, form)
  <span class="c-kw">const</span> showDetail = subType === <span class="c-str">'advanced'</span>

  <span class="c-kw">return</span> (
    &lt;<span class="c-prop">Form</span> form={form}&gt;
      &lt;<span class="c-prop">Item</span> name=<span class="c-str">"type"</span>&gt;&lt;<span class="c-prop">Select</span> options={TYPE_OPTIONS} /&gt;&lt;/<span class="c-prop">Item</span>&gt;
      &lt;<span class="c-prop">Item</span> name=<span class="c-str">"subType"</span>&gt;&lt;<span class="c-prop">Select</span> options={subOptions} /&gt;&lt;/<span class="c-prop">Item</span>&gt;
      {showDetail &amp;&amp; &lt;<span class="c-prop">Item</span> name=<span class="c-str">"detail"</span>&gt;&lt;<span class="c-prop">Input</span> /&gt;&lt;/<span class="c-prop">Item</span>&gt;}
    &lt;/<span class="c-prop">Form</span>&gt;
  )
}
<span class="c-cm">// 联动逻辑散落在组件各处，想复用 / 测试 / 配置化都很难。</span>`,j=`<span class="c-kw">const</span> schema = {
  type: <span class="c-str">'object'</span>,
  properties: {
    type: {
      type: <span class="c-str">'string'</span>,
      title: <span class="c-str">'类型'</span>,
      <span class="c-str">'x-component'</span>: <span class="c-str">'Select'</span>,
      enum: TYPE_OPTIONS,
    },
    subType: {
      type: <span class="c-str">'string'</span>,
      title: <span class="c-str">'子类型'</span>,
      <span class="c-str">'x-component'</span>: <span class="c-str">'Select'</span>,
      <span class="c-cm">// 联动：依赖 type，type 变化时异步拉选项 + 清空自己</span>
      <span class="c-str">'x-reactions'</span>: {
        dependencies: [<span class="c-str">'type'</span>],
        fulfill: {
          run: <span class="c-str">'$self.setState({ loading: true })'</span>,
          state: {
            dataSource: <span class="c-str">'{{$deps[0] ? fetchSubOptions($deps[0]) : []}}'</span>,
            value: <span class="c-str">'{{$deps[0] !== $self.modified ? undefined : $self.value}}'</span>,
          },
        },
      },
    },
    detail: {
      type: <span class="c-str">'string'</span>,
      title: <span class="c-str">'详情'</span>,
      <span class="c-str">'x-component'</span>: <span class="c-str">'Input'</span>,
      <span class="c-cm">// 联动：依赖 subType，subType=advanced 时才显示</span>
      <span class="c-str">'x-reactions'</span>: {
        dependencies: [<span class="c-str">'subType'</span>],
        fulfill: {
          state: { visible: <span class="c-str">'{{$deps[0] === "advanced"}}'</span> },
        },
      },
    },
  },
}

<span class="c-kw">const</span> RuleFormAfter = () =&gt; (
  &lt;<span class="c-prop">FormProvider</span> form={form}&gt;
    &lt;<span class="c-prop">SchemaField</span> schema={schema} /&gt;
  &lt;/<span class="c-prop">FormProvider</span>&gt;
)
<span class="c-cm">// 联动规则集中在 schema 里，整段 schema 可以推到后端配置。</span>`,u=`<span class="c-cm">// package.json scripts</span>
{
  <span class="c-str">"dev"</span>: <span class="c-str">"cross-env mode=dev max dev"</span>,
  <span class="c-str">"dev-mock"</span>: <span class="c-str">"cross-env mode=mock max dev"</span>,
  <span class="c-str">"gray"</span>: <span class="c-str">"cross-env mode=gray max dev"</span>,
  <span class="c-str">"build"</span>: <span class="c-str">"cross-env mode=production max build"</span>,
  <span class="c-str">"build-dev"</span>: <span class="c-str">"cross-env mode=dev max build"</span>,
  <span class="c-str">"build-gray"</span>: <span class="c-str">"cross-env mode=gray max build"</span>,
}

<span class="c-cm">// src/config/index.ts</span>
<span class="c-kw">export const</span> hostEnum = {
  mock:       <span class="c-str">'http://localhost:3001/mock'</span>,
  dev:        <span class="c-str">'https://api-dev.xxx.com'</span>,
  gray:       <span class="c-str">'https://api-gray.xxx.com'</span>,
  production: <span class="c-str">'https://api.xxx.com'</span>,
}

<span class="c-kw">export default</span> {
  host: hostEnum[process.env.mode <span class="c-kw">as keyof typeof</span> hostEnum] ?? hostEnum.dev,
}

<span class="c-cm">// .umirc.ts — 开发 proxy 用同一份 hostEnum</span>
<span class="c-kw">const</span> proxy = {
  <span class="c-str">'/proxyApi'</span>: {
    target: process.env.mode ? hostEnum[process.env.mode <span class="c-kw">as keyof typeof</span> hostEnum] : <span class="c-str">''</span>,
    changeOrigin: <span class="c-kw">true</span>,
    rewrite: (path) =&gt; path.<span class="c-fn">replace</span>(/^\\/proxyApi/, <span class="c-str">''</span>),
  },
}`,a=({html:c})=>s.jsx("pre",{className:"code-block",dangerouslySetInnerHTML:{__html:c}}),v=()=>(r.useEffect(()=>{const c=document.title;document.title="难点与方案 · 课程商业平台";const e=document.createElement("meta");return e.name="robots",e.content="noindex, nofollow",document.head.appendChild(e),()=>{document.title=c,document.head.removeChild(e)}},[]),s.jsx("div",{className:"interview-project-root",children:s.jsxs("div",{className:"shell",children:[s.jsx(i,{active:"challenges",lang:"zh"}),s.jsxs("main",{children:[s.jsxs("nav",{className:"breadcrumb","aria-label":"面包屑导航",children:[s.jsx(n,{to:l,children:"课程商业平台"}),s.jsx("span",{className:"sep",children:"/"}),s.jsx("span",{children:"难点与方案"})]}),s.jsxs("header",{className:"page-header",style:{marginBottom:40},children:[s.jsxs("div",{className:"section-eyebrow",children:[s.jsx("span",{className:"num",children:"07"}),"难点与方案"]}),s.jsx("h1",{className:"page-title",children:"五个硬骨头，以及怎么啃下来的"}),s.jsxs("p",{className:"page-lead",style:{marginTop:12},children:["每个难点都包含：",s.jsx("strong",{className:"em",children:"问题场景 · 实现架构图 · 方案拆解 · 代码对比 · 关键细节 · 效果 · 面试口述参考 · 追问 Q&A"}),"， 目的是让你看完一节，就能独立把这件事讲清楚。"]})]}),s.jsxs("h2",{className:"challenge-heading",children:[s.jsx("span",{className:"num",children:"01"}),"CRUD 框架抽象"]}),s.jsx("p",{className:"challenge-lead",children:"20+ 列表页，如何避免每个页面从零写一遍筛选、分页、请求逻辑。"}),s.jsx("div",{className:"sub-h",children:"问题场景"}),s.jsxs("p",{children:["整个后台里，列表页有 20+ 个 —— 课程项目、模板、组件、优惠券、课程商品、实物商品、推广工具、渠道活码、用户限购、课程限购…… 这些页面的",s.jsx("strong",{className:"em",children:"骨架高度相似"}),"："]}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:["顶部是",s.jsx("strong",{className:"em",children:"筛选栏"}),"：一组搜索字段（名称 / 状态 / 时间范围 / 创建人…）+ 搜索/重置按钮。"]}),s.jsxs("li",{children:["中部是",s.jsx("strong",{className:"em",children:"表格"}),"：列定义 + 分页 + 排序 + 列显隐。"]}),s.jsxs("li",{children:["右侧",s.jsx("strong",{className:"em",children:"操作列"}),"：查看 / 编辑 / 复制 / 删除 / 上下线，按权限显隐。"]}),s.jsxs("li",{children:["底部或顶部",s.jsx("strong",{className:"em",children:"批量操作栏"}),"：勾选后可批量执行操作。"]})]}),s.jsxs("p",{children:["如果每个页面都自己写一遍，",s.jsx("strong",{className:"em",children:"会带来三个实际问题"}),"："]}),s.jsxs("ol",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"代码量爆炸"}),"：一个裸写的列表页容易写到 400-500 行，其中 80% 是样板代码。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"交互不一致"}),"：A 页面翻页会重置筛选，B 页面不重置；A 页面点列表头就搜，B 页面要点按钮才搜；细节差异随时间滋生。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"维护灾难"}),'：想统一加"筛选条件持久化到 URL"这种全局改动，要改 20+ 个文件。']})]}),s.jsx("div",{className:"sub-h",children:"功能实现架构图"}),s.jsxs("div",{className:"diagram","aria-label":"CRUD 框架分层图",children:[s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"业务页面层（薄）"}),s.jsxs("div",{className:"block",children:["CouponList",s.jsx("span",{className:"sub",children:"只写 COLUMNS + searchFn"})]}),s.jsxs("div",{className:"block",children:["CourseProjectList",s.jsx("span",{className:"sub",children:"只写 COLUMNS + searchFn"})]}),s.jsxs("div",{className:"block",children:["UserLimitList",s.jsx("span",{className:"sub",children:"只写 COLUMNS + searchFn"})]}),s.jsxs("div",{className:"block",children:["... 20+ 页面",s.jsx("span",{className:"sub",children:"相同的使用姿势"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"CRUD 原语层（核心）"}),s.jsxs("div",{className:"block highlight",children:["useTableSearch",s.jsx("span",{className:"sub",children:"筛选 + 分页 + 请求时机统一"})]}),s.jsxs("div",{className:"block highlight",children:["useTableSet",s.jsx("span",{className:"sub",children:"列显隐 / 列宽持久化"})]}),s.jsxs("div",{className:"block highlight",children:["FormSearchGroup",s.jsx("span",{className:"sub",children:"顶部筛选栏组件"})]}),s.jsxs("div",{className:"block highlight",children:["FilterComponent",s.jsx("span",{className:"sub",children:"快速状态 Tab"})]}),s.jsxs("div",{className:"block highlight",children:["TableOperationDropdown",s.jsx("span",{className:"sub",children:"操作列（自动权限过滤）"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"基础依赖层"}),s.jsx("div",{className:"block",children:"antd Table / ProTable"}),s.jsxs("div",{className:"block",children:["Formily",s.jsx("span",{className:"sub",children:"搜索表单由它驱动"})]}),s.jsxs("div",{className:"block",children:["useAuthCheck",s.jsx("span",{className:"sub",children:"按钮级权限"})]}),s.jsx("div",{className:"block",children:"axios · Swagger API"})]})]}),s.jsx("div",{className:"sub-h",children:"核心思路"}),s.jsxs("p",{children:[s.jsx("strong",{className:"em",children:"把每个列表页都逃不掉的几件事抽出来，做成 3 个 hook + 3 个组件"}),"。 业务页面从此只承担两件事：",s.jsx("strong",{className:"em",children:"① 定义列（columns）"})," 和 ",s.jsx("strong",{className:"em",children:"② 指定请求函数（searchFn）"}),"。 其他的筛选状态、分页状态、请求时机、翻页保留筛选、重新搜索重置 current、loading 态、列持久化 —— 全部由原语层统一处理。"]}),s.jsx("div",{className:"sub-h",children:"代码对比"}),s.jsx("div",{className:"code-caption before",children:"Before · 裸写一个优惠券列表页（~450 行中的主要样板）"}),s.jsx(a,{html:d}),s.jsx("div",{className:"code-caption after",children:"After · 用 CRUD 原语后的同一个列表页（~80 行）"}),s.jsx(a,{html:t}),s.jsx("div",{className:"sub-h",children:"关键细节（面试官可能追问的点）"}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"useTableSearch 的签名"}),"：输入 ",s.jsx("code",{children:"{ searchFn, defaultParams, transform }"}),"， 输出 ",s.jsx("code",{children:"{ tableProps, searchFormProps, refresh, params }"}),"。",s.jsx("code",{children:"tableProps"})," 直接铺到 antd Table 上，",s.jsx("code",{children:"searchFormProps"})," 铺到筛选栏组件上。外层甚至不用知道里面用了什么 state。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"翻页重置策略统一"}),"：点搜索 → current 回到 1；点翻页 → 保留筛选；点重置 → 清 params + current 回到 1。 这一套之前各页面各写各的，现在集中定义、所有列表页自动一致。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"请求时机"}),"：",s.jsx("code",{children:"defaultParams"})," 变化时 / 手动 ",s.jsx("code",{children:"refresh()"})," 时触发。 筛选字段变化",s.jsx("strong",{className:"em",children:"不自动搜"}),"（避免误触发），必须显式点搜索。这个是经过讨论的默认值，业务有特殊需求可以关。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"列持久化的 key"}),"：用 ",s.jsx("code",{children:"useTableSet(columns, 'coupon-list')"})," 的第二个参数作为 localStorage key， 避免不同列表页的列配置互相覆盖。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"操作列权限过滤"}),"：",s.jsx("code",{children:"TableOperationDropdown"})," 接收 actions 数组，每个 action 可以带",s.jsx("code",{children:"authKey"}),"，内部会用 ",s.jsx("code",{children:"useAuthCheck(authKey)"})," 过滤掉无权限的项。业务代码写按钮时不用再手动写权限判断。"]})]}),s.jsx("div",{className:"sub-h",children:"实际效果"}),s.jsxs("div",{className:"card-grid",children:[s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"开发成本"}),s.jsx("div",{className:"mini-stat",children:"0.5 人天 → 2 小时"}),s.jsx("div",{className:"mini-desc",children:"新增一个标准列表页的平均耗时。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"代码体量"}),s.jsx("div",{className:"mini-stat",children:"~450 行 → ~80 行"}),s.jsx("div",{className:"mini-desc",children:"同一个页面（优惠券列表）的前后对比。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"交互一致性"}),s.jsx("div",{className:"mini-stat",children:"20+ 页面统一"}),s.jsx("div",{className:"mini-desc",children:"翻页、搜索、重置、列持久化行为完全一致。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"全局改动成本"}),s.jsx("div",{className:"mini-stat",children:"N 处 → 1 处"}),s.jsx("div",{className:"mini-desc",children:'例如"筛选条件同步到 URL"这种需求，只改 hook 即可。'})]})]}),s.jsxs("div",{className:"pitch",children:[s.jsx("div",{className:"pitch-label",children:"面试这样说"}),s.jsx("p",{children:'"中后台项目里，列表页的重复度是最高的。我们这个项目有 20+ 个列表页，结构高度相似： 顶部筛选、中间表格、右侧操作列、可能还有批量操作。如果每个页面都裸写一遍，一个页面四五百行、 20+ 个页面累计上万行样板代码，而且翻页重置策略、筛选时机这些细节容易不一致。"'}),s.jsxs("p",{children:['"我的做法是抽一层 ',s.jsx("strong",{className:"em",children:"CRUD 原语"}),' —— 包括 useTableSearch、useTableSet 两个 hook， 和 FormSearchGroup、FilterComponent、TableOperationDropdown 三个组件。 业务页面从此只需要定义 columns 和 searchFn，其他全部由原语层接管。"']}),s.jsxs("p",{children:['"最后效果是新列表页从半天缩到两小时，同一个页面代码从 450 行降到 80 行。 更重要的是',s.jsx("strong",{className:"em",children:"行为一致性"}),'—— 用户在任何一个列表页的体验是一样的，这是纯靠抽象带来的价值，不只是节省代码。"']})]}),s.jsxs("div",{className:"qa","aria-label":"面试追问 Q&A",children:[s.jsxs("details",{children:[s.jsx("summary",{children:"为什么不直接用 Ant Design Pro 的 ProTable？"}),s.jsx("div",{className:"answer",children:'ProTable 确实是起点，我们也在用它。但 ProTable 的 API 比较"大"、耦合也比较强（搜索 / 分页 / 请求全在一个组件里）， 当业务有精细控制时（比如"翻页不重置筛选但重置排序"、"特定字段要防抖、其他不要"）容易和 ProTable 的默认行为打架。 所以我们在 ProTable 之外薄薄包了一层自己的 hook 和组件，简单列表直接用 ProTable，复杂列表走我们的封装，两层并存。'})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"useTableSearch 内部是怎么实现的？"}),s.jsxs("div",{className:"answer",children:["核心就是用 ",s.jsx("code",{children:"useState"})," 管理 params / pagination / dataSource / loading 四块状态， 提供 ",s.jsx("code",{children:"onSearch"})," / ",s.jsx("code",{children:"onReset"})," / ",s.jsx("code",{children:"onChange"})," 三个事件处理器， 配合 ",s.jsx("code",{children:"useEffect"})," 在必要时机触发 searchFn。 用 ahooks 的 useRequest 也完全可以，我们当时手写是因为希望对请求时机有完全控制权。 关键不在于用什么库，而在于",s.jsx("strong",{className:"em",children:"把规则定下来、在全站统一"}),"。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"如果某个列表页有非标需求，比如拖拽排序整个表格，你的封装怎么应对？"}),s.jsxs("div",{className:"answer",children:["我的原则是",s.jsx("strong",{className:"em",children:"不强行把非标需求塞进通用组件"}),'。拖拽排序这种交互，让该业务页面自己实现， 通用组件不做兼容。通用组件只聚焦在"大多数列表页都有"的部分 —— 如果为了 10% 的场景把通用组件的 API 撑大， 剩下 90% 的页面会受累。过度抽象是 B 端项目最容易踩的坑，克制很重要。']})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"分页、筛选状态为什么不放 URL？用户刷新页面会丢。"}),s.jsxs("div",{className:"answer",children:["默认不放 URL，原因有两个：一是 URL 会很长不优雅；二是后台页面被分享的场景并不多。",s.jsx("strong",{className:"em",children:"少数有需求的页面"}),'（例如"把筛选结果发给同事"）可以通过 ',s.jsx("code",{children:"useTableSearch"})," 的一个开关 把 params 同步到 URL search。",s.jsx("strong",{className:"em",children:"默认简单、个别场景开关"}),"是我处理这类权衡的惯用风格。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"列的权限过滤（某列不是所有人都能看）怎么做？"}),s.jsxs("div",{className:"answer",children:["两种方式：① columns 定义里每项可以带 ",s.jsx("code",{children:"authKey"}),"，",s.jsx("code",{children:"useTableSet"})," 初始化时会用",s.jsx("code",{children:"useAuthCheck"})," 过滤掉无权限的列；② 业务页面自己根据 ",s.jsx("code",{children:"useAuthCheck"}),"条件渲染 columns。第一种更统一，第二种更灵活，两者都支持。"]})]})]}),s.jsxs("h2",{className:"challenge-heading",children:[s.jsx("span",{className:"num",children:"02"}),"细粒度权限系统"]}),s.jsx("p",{className:"challenge-lead",children:"菜单 / 路由 / 按钮三层权限，10+ 种岗位，散写 if/else 是灾难。"}),s.jsx("div",{className:"sub-h",children:"问题场景"}),s.jsxs("p",{children:["公司有 10+ 种岗位同时使用这个后台：运营、市场、商品、客服、主管、管理员…… 每种岗位看到的",s.jsx("strong",{className:"em",children:"菜单、页面、按钮都不一样"}),"："]}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"菜单级"}),'：普通运营看不到"系统管理"菜单；商品岗看不到"用户画像"模块。']}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"路由级"}),'：运营能进到"优惠券列表"，但进不到"优惠券配置"详情页。']}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"按钮级"}),'：同一个页面，普通运营只能看、主管能"审核"、管理员能"删除"。']})]}),s.jsxs("p",{children:["如果把权限判断散落到业务代码里，就会出现",s.jsx("strong",{className:"em",children:"几十个地方写 if (user.role === 'admin' || ...)"}),"这样的逻辑，一旦权限规则调整，要改的地方散落在各处，几乎必然漏掉某个按钮。"]}),s.jsx("div",{className:"sub-h",children:"功能实现架构图"}),s.jsxs("div",{className:"diagram","aria-label":"权限系统架构图",children:[s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"数据源（后端）"}),s.jsxs("div",{className:"block",children:["权限接口",s.jsx("span",{className:"sub",children:"返回一棵带 type 字段的菜单树"})]}),s.jsxs("div",{className:"block",children:["type 字段分类",s.jsx("span",{className:"sub",children:"type=0/1 是菜单；其他是功能（按钮）"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"前端启动期（Umi Max）"}),s.jsxs("div",{className:"block",children:["getInitialState()",s.jsx("span",{className:"sub",children:"app.tsx 里启动时拉权限"})]}),s.jsxs("div",{className:"block",children:["遍历拆分",s.jsx("span",{className:"sub",children:"按 type 拆成 menus[] / functions[]"})]}),s.jsxs("div",{className:"block highlight",children:["initialState",s.jsx("span",{className:"sub",children:"{ menus, functions } 全局可用"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"access.ts（开关生成）"}),s.jsxs("div",{className:"block highlight",children:["canSeeXxx: menus.includes(...)",s.jsx("span",{className:"sub",children:"菜单权限开关"})]}),s.jsxs("div",{className:"block highlight",children:["functions: [...]",s.jsx("span",{className:"sub",children:"按钮权限原始数组"})]}),s.jsxs("div",{className:"block",children:["50+ 个开关",s.jsx("span",{className:"sub",children:"按业务域分组"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"业务消费层（三种方式）"}),s.jsxs("div",{className:"block",children:["路由级",s.jsx("span",{className:"sub",children:"routes[].access = 'canSeeXxx'"})]}),s.jsxs("div",{className:"block",children:["页面级",s.jsx("span",{className:"sub",children:"<Access accessible={xx} fallback={<403/>}>"})]}),s.jsxs("div",{className:"block",children:["按钮级",s.jsx("span",{className:"sub",children:"useAuthCheck('xxx-edit')"})]})]})]}),s.jsx("div",{className:"sub-h",children:"核心思路"}),s.jsxs("p",{children:[s.jsx("strong",{className:"em",children:'"一处数据 · 一处声明 · 三处消费"'}),"。 所有权限数据只在启动时拉一次；所有权限开关只在 access.ts 里声明一次； 业务层有路由、页面、按钮三种消费方式，彼此独立但都读同一份 access。 业务代码",s.jsx("strong",{className:"em",children:"完全不碰原始权限数据"}),"，只消费 access 上的命名开关。"]}),s.jsx("div",{className:"sub-h",children:"代码对比"}),s.jsx("div",{className:"code-caption before",children:"Before · 权限判断散落在业务代码里"}),s.jsx(a,{html:p}),s.jsx("div",{className:"code-caption after",children:"After · 集中声明，业务代码只认语义化开关"}),s.jsx(a,{html:o}),s.jsx("div",{className:"sub-h",children:"启动期的完整链路"}),s.jsxs("div",{className:"flow","aria-label":"权限启动链路",children:[s.jsx("span",{className:"node accent",children:"SSO 登录"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node",children:"token 写 Cookie"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node",children:"getInitialState()"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node",children:"拉权限树"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node",children:"按 type 拆分"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node accent",children:"access.ts 生成 50+ 开关"}),s.jsx("span",{className:"arrow",children:"→"}),s.jsx("span",{className:"node",children:"路由守卫 + 菜单渲染 + 按钮显隐"})]}),s.jsx("div",{className:"sub-h",children:"关键细节"}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"type 字段的约定"}),"：后端返回的权限节点里，",s.jsx("code",{children:"type=0"})," 和 ",s.jsx("code",{children:"type=1"})," 代表菜单， 其他值（比如 ",s.jsx("code",{children:"type=2"}),"）代表功能按钮。前端 ",s.jsx("code",{children:"getInitialState"})," 里递归遍历拆分， 推到 ",s.jsx("code",{children:"menus[]"})," 或 ",s.jsx("code",{children:"functions[]"}),"。这是和后端约定好的契约。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"initialState 只在启动时拉一次"}),"，没有做实时订阅。权限变更频率不高，刷新页面或重新登录即生效，够用。 如果未来有实时生效需求，可以用 Umi 的 ",s.jsx("code",{children:"setInitialState"})," 主动刷新。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"前端权限不是安全边界"}),"。我们和后端明确过：前端拦截只是 UI 便利， 避免用户看到无权入口、避免无效请求。真正的安全由后端接口独立鉴权。用户手改 URL 绕过前端 → 最多走到页面壳， 真正的数据接口会被后端拒掉。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"useAuthCheck 的开销"}),"：本质是 ",s.jsx("code",{children:"Array.includes"})," 查一个字符串数组，即使 1000 个 key 也是微秒级。 不用担心性能。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"新模块接入成本"}),"：",s.jsx("code",{children:"routes/index.ts"})," 加节点 + ",s.jsx("code",{children:"access.ts"})," 加开关，就接入全站权限系统。 不需要动业务代码之外的任何地方。"]})]}),s.jsx("div",{className:"sub-h",children:"实际效果"}),s.jsxs("div",{className:"card-grid",children:[s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"权限覆盖粒度"}),s.jsx("div",{className:"mini-stat",children:"50+ 开关"}),s.jsx("div",{className:"mini-desc",children:"菜单级 + 按钮级，支持 10+ 种岗位隔离。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"业务代码零权限字符串"}),s.jsx("div",{className:"mini-stat",children:"0 处硬编码"}),s.jsx("div",{className:"mini-desc",children:"所有权限字符串只在 access.ts 出现一次。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"越权事故"}),s.jsx("div",{className:"mini-stat",children:"0"}),s.jsx("div",{className:"mini-desc",children:"上线以来前端侧无越权访问事故。"})]}),s.jsxs("div",{className:"mini-card",children:[s.jsx("div",{className:"mini-title",children:"新模块接入"}),s.jsx("div",{className:"mini-stat",children:"2 处改动"}),s.jsx("div",{className:"mini-desc",children:"routes + access，无需改其他基础代码。"})]})]}),s.jsxs("div",{className:"pitch",children:[s.jsx("div",{className:"pitch-label",children:"面试这样说"}),s.jsxs("p",{children:['"B 端后台的权限最怕的是散写 —— 几十个业务页面里到处写',s.jsx("code",{children:"if (user.role === 'xxx')"}),'，规则一变就要改一片，还容易漏按钮。 我们这个项目有 10+ 种岗位、三层权限（菜单、路由、按钮），散写必死。"']}),s.jsxs("p",{children:['"我的做法是',s.jsx("strong",{className:"em",children:"一处数据、一处声明、三处消费"}),'。启动时拉一次权限树， 按 type 字段拆成菜单数组和按钮数组，扔给 Umi Max 的 initialState。 然后在 access.ts 里一次性声明 50+ 个语义化开关，比如 canSeePresentCoupon。 业务代码里只认这些语义化名字 —— 路由挂 access 字段、页面用 Access 组件、按钮用 useAuthCheck hook。"']}),s.jsxs("p",{children:['"这样做的好处是权限规则变更只改一个地方（access.ts），业务代码里',s.jsx("strong",{className:"em",children:"不出现任何权限字符串"}),'。 新人接手看 access.ts 就能知道系统有哪些权限、每个权限控制什么。 另外我们和后端明确了：前端权限只是 UI 便利，真正的安全边界由后端接口保证。"']})]}),s.jsxs("div",{className:"qa","aria-label":"面试追问 Q&A",children:[s.jsxs("details",{children:[s.jsx("summary",{children:"如果权限变更需要实时生效（用户被管理员下掉某个权限立刻看不到按钮）怎么做？"}),s.jsxs("div",{className:"answer",children:["默认方案是刷新页面或重登生效。如果需要实时，可以：① 业务上加一个长轮询或 WebSocket 通知权限变更； ② 收到通知后调用 Umi 的 ",s.jsx("code",{children:"setInitialState"})," 重新拉权限；③ access 会根据新的 initialState 重新计算， 业务层通过 ",s.jsx("code",{children:"useAccess"})," 自动感知。我们项目里权限变更不频繁，没有做这层，够用。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"怎么防止新加页面时忘记配权限？"}),s.jsxs("div",{className:"answer",children:["两道关：① ",s.jsx("code",{children:"routes/index.ts"}),' 里通过 code review 强制每个节点必须有 access 字段（没加会被挡下）； ② 权限树里不存在的 path 访问会自动走 403 兜底。新人就算忘加，最严重的后果是用户访问报 403， 不会出现"能访问不该看的页面"。']})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"access.ts 里 50+ 个开关会不会维护起来很痛苦？"}),s.jsxs("div",{className:"answer",children:["实际上不痛苦，原因是",s.jsx("strong",{className:"em",children:"按业务域分组 + 注释到位"}),"。 我们按项目中心 / 礼品中心 / 小工具等分区，每段前面有注释，加新开关就是抄一行改个名字。 这比业务代码里散落几百处硬编码权限字符串维护成本低得多。"]})]}),s.jsxs("details",{children:[s.jsxs("summary",{children:["useAuthCheck 和 ","<Access>"," 组件有什么区别？什么时候用哪个？"]}),s.jsxs("div",{className:"answer",children:[s.jsx("code",{children:"<Access>"})," 来自 Umi Max，接收 access 对象上的布尔开关，一般用于包裹",s.jsx("strong",{className:"em",children:"整页或整块 UI"}),"， 配合 ",s.jsx("code",{children:"fallback"})," 做降级。",s.jsx("code",{children:"useAuthCheck"})," 是我们自封装的 hook， 基于 ",s.jsx("code",{children:"functions"})," 数组，一般用于",s.jsx("strong",{className:"em",children:"按钮 / 操作项"}),"这种需要返回布尔值做条件渲染的场景。 粗粒度用 Access，细粒度用 useAuthCheck。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"前端拉权限是同步的，第一次进入很慢怎么办？"}),s.jsxs("div",{className:"answer",children:["Umi Max 的 ",s.jsx("code",{children:"getInitialState"})," 是 Promise，页面在它 resolve 之前会渲染一个 loading 组件（",s.jsx("code",{children:"loading.tsx"}),"）。 实际接口耗时 200-400ms，用户感知是一次轻微白屏，可接受。 优化方向有两个：① 权限接口 HTTP 缓存 + ETag；② 拉成功后写一份到 localStorage，下次启动先用缓存再后台更新。 我们目前用的是方案一。"]})]})]}),s.jsxs("h2",{className:"challenge-heading",children:[s.jsx("span",{className:"num",children:"03"}),"SSO 登录与统一请求链路"]}),s.jsx("p",{className:"challenge-lead",children:"token 怎么拿、怎么存、过期怎么办 —— 业务代码不该碰这些。"}),s.jsx("div",{className:"sub-h",children:"问题场景"}),s.jsx("p",{children:"公司用 SSO 做单点登录，多个子系统共享登录态。前端至少要处理四件事："}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"登录态获取"}),"：用户第一次来，或者从别的子系统跳过来（URL 带 token）。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"token 注入"}),"：每个请求都要带上登录凭证。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"业务错误统一提示"}),"：后端约定的 ",s.jsx("code",{children:"stat"})," / ",s.jsx("code",{children:"code"})," 字段，错了就弹 message。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"token 过期兜底"}),"：401 时自动跳 SSO 登出，带上 redirect_url，登录后回到原页面。"]})]}),s.jsx("div",{className:"sub-h",children:"功能实现架构图"}),s.jsxs("div",{className:"diagram","aria-label":"请求链路架构图",children:[s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"启动期"}),s.jsxs("div",{className:"block",children:["从 URL 抓 token",s.jsx("span",{className:"sub",children:"SSO 回跳时 ?token=xxx"})]}),s.jsxs("div",{className:"block",children:["写 Cookie",s.jsx("span",{className:"sub",children:"setToken(token)"})]}),s.jsxs("div",{className:"block",children:["checkLogin()",s.jsx("span",{className:"sub",children:"拉用户信息 / 权限"})]}),s.jsxs("div",{className:"block",children:["无登录 → 跳 SSO",s.jsx("span",{className:"sub",children:"带 redirect_url"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"请求拦截器"}),s.jsxs("div",{className:"block highlight",children:["注入 Authorization",s.jsx("span",{className:"sub",children:"从 Cookie 读 token"})]}),s.jsxs("div",{className:"block highlight",children:["baseURL 按环境",s.jsx("span",{className:"sub",children:"config.host"})]}),s.jsxs("div",{className:"block highlight",children:["dev 加 isDebug: 1",s.jsx("span",{className:"sub",children:"本地联调跳过登录"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"响应拦截器"}),s.jsxs("div",{className:"block",children:["剥壳 data.data",s.jsx("span",{className:"sub",children:"业务不用每次点两下"})]}),s.jsxs("div",{className:"block",children:["stat !== 1 → 弹 message",s.jsx("span",{className:"sub",children:"业务错误统一处理"})]}),s.jsxs("div",{className:"block highlight",children:["401 → SSO 登出 + 回跳",s.jsx("span",{className:"sub",children:"带 redirect_url 回到原页"})]}),s.jsxs("div",{className:"block",children:['其他网络错 → "系统异常"',s.jsx("span",{className:"sub",children:"兜底提示"})]})]})]}),s.jsx("div",{className:"sub-h",children:"核心思路"}),s.jsxs("p",{children:[s.jsx("strong",{className:"em",children:'"业务代码只关心 happy path"'}),"。 所有和鉴权、错误处理相关的逻辑全部收敛到 axios 实例的两个拦截器里。 业务函数就像调本地函数一样调 API：",s.jsx("code",{children:"const user = await getUserInfo()"})," —— 直接得到 UserInfo 类型， 不用关心 response 层级、不用关心错误提示、不用关心 token 是不是过期了。"]}),s.jsx("div",{className:"sub-h",children:"代码示例"}),s.jsx("div",{className:"code-caption",children:"axios 实例 + 请求/响应拦截器"}),s.jsx(a,{html:m}),s.jsx("div",{className:"code-caption",children:"业务代码调用（没有任何错误处理 / 鉴权样板）"}),s.jsx(a,{html:h}),s.jsx("div",{className:"sub-h",children:"关键细节"}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"token 放 Cookie 不放 localStorage"}),"：Cookie 可以被 SSO 服务跨域写入（配合合适的 domain）， 也方便后端拿到；localStorage 必须等前端 JS 执行后才能写，中间有空窗期。不过 Cookie 我们没启用 HttpOnly 因为前端要读，是权衡。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"剥壳（response.data.data）"}),"：后端返回结构固定是 ",s.jsx("code",{children:"{ stat, code, msg, data, traceid }"}),"。 拦截器里统一 ",s.jsx("code",{children:"return response.data.data"}),"，业务代码就直接拿业务对象。 配合 Swagger 生成的类型，业务层代码干净到像调本地函数。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"开发环境 isDebug=1"}),"：和后端约定的调试头，带上它后端会跳过部分登录校验，本地联调顺畅； 生产环境不加这个头，不会有安全问题。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"401 的 redirect_url 回跳"}),"：用 ",s.jsx("code",{children:"encodeURIComponent(window.location.href)"})," 把当前 URL 作为参数传给 SSO，登录后 SSO 会把用户送回来。URL query 里的页面状态（比如筛选条件）能保住， 但表单里暂存的数据会丢（这是可继续改进的点，用 localStorage 草稿）。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"为什么 code=401 时不 reject"}),"：这是后端的约定 —— code=401 表示未登录但允许静默返回 null， 由业务层决定是否弹提示。和网络层 HTTP 401 是两回事（后者由外层 catch 处理 + 跳 SSO）。"]})]}),s.jsxs("div",{className:"pitch",children:[s.jsx("div",{className:"pitch-label",children:"面试这样说"}),s.jsx("p",{children:'"我们用的是公司的 SSO 单点登录，多子系统共享登录态。前端要处理四件事： 获取登录态、注入 token、统一业务错误提示、token 过期自动跳转。 这些如果每个调用点都写，会变成几百处重复代码。"'}),s.jsx("p",{children:'"我的做法是把所有鉴权和错误处理收敛到 axios 实例的两个拦截器里： 请求拦截器从 Cookie 读 token 注入 Authorization header； 响应拦截器先剥壳 data.data 让业务代码干净，然后统一处理 stat/code 字段 —— 业务错误弹 toast，401 清 token 跳 SSO 并带 redirect_url 回跳。"'}),s.jsxs("p",{children:['"业务代码就像调本地函数一样：',s.jsx("code",{children:"const user = await getUserInfo()"}),'， 直接拿到 UserInfo 类型，不需要关心任何错误处理、不需要关心 token。 配合 Swagger 自动生成类型，整条链路完全类型安全。"']})]}),s.jsxs("div",{className:"qa","aria-label":"面试追问 Q&A",children:[s.jsxs("details",{children:[s.jsx("summary",{children:"如果用户在一个长表单页 token 过期，跳登录后表单数据丢了怎么办？"}),s.jsx("div",{className:"answer",children:"这是我们当时讨论过的一个痛点。现在的方案是 URL query 里的状态能保住（redirect_url 带了完整 URL）， 但表单的 in-memory 状态会丢。 进一步优化是对长表单做 localStorage 草稿机制 —— 我们在工作台（页面搭建器）上做了草稿， 其他场景目前没做，算是可以继续改的点。面试被问到可以把这点如实说。"})]}),s.jsxs("details",{children:[s.jsx("summary",{children:'拦截器里对 stat 和 code 的处理，业务如果想"错误不弹 toast 自己处理"怎么办？'}),s.jsxs("div",{className:"answer",children:["这是个边界场景。默认拦截器会自动弹 toast 并 reject，业务只需要 ",s.jsx("code",{children:".catch"}),' 里处理就行。 少数场景（比如"这个错误用户其实不需要看到"），可以在请求 config 上传一个自定义字段',s.jsx("code",{children:"silent: true"}),'，拦截器检测到就不弹 toast。这是"默认简单、特殊场景可关"的一贯思路。']})]}),s.jsxs("details",{children:[s.jsxs("summary",{children:["为什么不用 axios 的 ",s.jsx("code",{children:"config.validateStatus"})," 来处理 2xx 以外的响应？"]}),s.jsxs("div",{className:"answer",children:['validateStatus 只能基于 HTTP status 做判断。我们这里的"业务成功"是 ',s.jsx("code",{children:"response.data.stat === 1"}),"， HTTP 可能是 200 但业务失败，所以必须在响应拦截器里处理。 网络层错误（HTTP 4xx/5xx）由 axios 的 error handler 处理，这两层拆得很清楚。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"Swagger 自动生成的类型怎么和你的剥壳逻辑配合？"}),s.jsxs("div",{className:"answer",children:["Swagger 生成工具知道后端返回结构是 ",s.jsx("code",{children:"{stat, code, data, ...}"}),"，生成的 API 函数返回类型 直接是 ",s.jsx("code",{children:"data.data"})," 的类型（而不是外壳类型）。这样业务层 ",s.jsx("code",{children:"const user = await getUserInfo()"}),"得到的 user 就是 UserInfo 类型，和拦截器的剥壳行为完全对齐。"]})]})]}),s.jsxs("h2",{className:"challenge-heading",children:[s.jsx("span",{className:"num",children:"04"}),"复杂嵌套表单"]}),s.jsx("p",{className:"challenge-lead",children:"限购规则、课程关系这类深层嵌套 + 字段联动场景。"}),s.jsx("div",{className:"sub-h",children:"问题场景"}),s.jsx("p",{children:"后台里有几类表单的复杂度显著高于普通 CRUD："}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"限购规则"}),"：按用户类型 / 年级 / 历史订单数 / 购买时间等维度组合条件，规则之间有 AND/OR 关系。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"课程关系"}),"：定义课程之间的互斥 / 替代 / 升级关系，一个课程可以关联多组关系链。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"渠道配置"}),"：一个渠道下挂多个客服号，每个客服号有自己的接待规则、归因方式。"]})]}),s.jsx("p",{children:"这类表单用 AntD Form 裸写的话，会出现："}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:["字段联动靠 ",s.jsx("code",{children:"useEffect"})," + ",s.jsx("code",{children:"form.getFieldValue"})," + ",s.jsx("code",{children:"form.setFieldValue"})," 实现，一堆副作用，难追踪。"]}),s.jsx("li",{children:"动态增减子项（比如一条规则里增减条件）要手动管状态，容易出 bug。"}),s.jsx("li",{children:"表单结构和业务数据结构耦合在一起，想把规则结构推到后端配置 → 改代码。"})]}),s.jsx("div",{className:"sub-h",children:"功能实现架构图"}),s.jsxs("div",{className:"diagram","aria-label":"Formily 表单架构图",children:[s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"数据层"}),s.jsxs("div",{className:"block",children:["Schema（JSON）",s.jsx("span",{className:"sub",children:"描述字段结构 + 联动规则"})]}),s.jsxs("div",{className:"block",children:["Form Model",s.jsx("span",{className:"sub",children:"@formily/core 创建的响应式模型"})]}),s.jsxs("div",{className:"block",children:["values",s.jsx("span",{className:"sub",children:"扁平化的表单数据"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"Formily 渲染层"}),s.jsxs("div",{className:"block highlight",children:["<SchemaField schema={schema} />",s.jsx("span",{className:"sub",children:"根据 schema 自动渲染"})]}),s.jsxs("div",{className:"block highlight",children:["Reactions",s.jsx("span",{className:"sub",children:"声明式字段联动"})]}),s.jsxs("div",{className:"block highlight",children:["validators",s.jsx("span",{className:"sub",children:"内置 + 自定义校验"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"自定义表单项（components/formily/）"}),s.jsx("div",{className:"block",children:"Cascader"}),s.jsx("div",{className:"block",children:"MultipleSelect"}),s.jsx("div",{className:"block",children:"StepNumberInput"}),s.jsx("div",{className:"block",children:"TrimInput"}),s.jsx("div",{className:"block",children:"Upload"}),s.jsx("div",{className:"block",children:"Switch"}),s.jsx("div",{className:"block",children:"Segmented"}),s.jsx("div",{className:"block",children:"SingleCheckBox"})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"UI 展现层"}),s.jsxs("div",{className:"block",children:["Ant Design 4",s.jsx("span",{className:"sub",children:"最终渲染由 antd 组件完成"})]})]})]}),s.jsx("div",{className:"sub-h",children:"核心思路"}),s.jsxs("p",{children:[s.jsx("strong",{className:"em",children:'用 Formily 的"响应器模型"把字段联动从"命令式 useEffect"变成"声明式 reactions"'}),'。 schema 里描述"A 字段变化时，B 字段的可见性/默认值/选项怎么变" —— 所有联动规则都在 schema 里，不散落在业务组件里。 进一步，schema 本身可以从后端接口拉取，实现"规则配置化"。']}),s.jsx("div",{className:"sub-h",children:"代码对比"}),s.jsx("div",{className:"code-caption before",children:"Before · 裸用 AntD Form + useEffect 做联动"}),s.jsx(a,{html:x}),s.jsx("div",{className:"code-caption after",children:"After · 用 Formily reactions 声明式描述联动"}),s.jsx(a,{html:j}),s.jsx("div",{className:"sub-h",children:"关键细节"}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"响应器（Reactions）的本质"}),"：字段之间的观察者模式。",s.jsx("code",{children:"dependencies"}),' 声明"我关心谁的变化"，',s.jsx("code",{children:"fulfill"}),' 描述"变化时我要做什么"。 Formily 在内部维护一个依赖图，只有真正依赖的字段会重新计算，性能很好。']}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"自定义表单项注册"}),"：在 ",s.jsx("code",{children:"components/formily/"})," 下封装项目专用组件（Cascader、MultipleSelect 等）， 通过 ",s.jsx("code",{children:"SchemaField.register"})," 注册后就能在 schema 里用 ",s.jsx("code",{children:"'x-component': 'Cascader'"})," 直接引用。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"动态 schema"}),"：schema 本身是个 JSON 对象，可以从接口拉。 比如限购规则的 schema 由后端配置中心下发，前端拉到后直接渲染 —— 新增规则不用改代码。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"校验"}),"：Formily 内置常用 validator（required / format / max / min / pattern…）， 也支持自定义函数 validator。我们在 ",s.jsx("code",{children:"utils/validator.ts"})," 里注册了项目通用 validator（手机号、身份证、校验重复等）。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"性能"}),"：Formily 用细粒度更新，单个字段变化只触发依赖它的字段重渲染。 最大的表单我们做到 60+ 字段，没有可感知卡顿。"]})]}),s.jsxs("div",{className:"pitch",children:[s.jsx("div",{className:"pitch-label",children:"面试这样说"}),s.jsx("p",{children:'"这个后台里有几类表单特别复杂 —— 限购规则、课程关系、渠道配置。 字段深层嵌套、字段之间大量联动，比如 A 选了某个值，B 的可见性和选项都要跟着变。 裸用 AntD Form 会写出一堆 useEffect + getFieldValue + setFieldValue，联动逻辑散落在业务组件里，难维护也难测试。"'}),s.jsxs("p",{children:['"我的选择是用 ',s.jsx("strong",{className:"em",children:"Formily 的响应器模型"}),'。把所有联动用声明式的 reactions 写在 schema 里 —— 依赖谁、依赖变化时做什么，都在一个地方声明。整段 schema 是纯 JSON，甚至可以推到后端做配置化， 新规则不改代码就能上线。"']}),s.jsxs("p",{children:['"自定义表单项我们沉淀了一套在 ',s.jsx("code",{children:"components/formily/"})," 下，包括级联、多选、数字步进、trim 输入等 8 种， 业务写 schema 时 ",s.jsx("code",{children:"'x-component': 'Cascader'"}),' 就能用。配合 Formily 的校验体系， 60+ 字段的大表单也不卡、联动清晰、可测试。"']})]}),s.jsxs("div",{className:"qa","aria-label":"面试追问 Q&A",children:[s.jsxs("details",{children:[s.jsx("summary",{children:"Formily 学习成本不低，团队怎么推起来的？"}),s.jsx("div",{className:"answer",children:"坦白讲有学习曲线，一个新人写出第一个复杂表单大概一周。我做的三件事： ① 整理了项目里的 Formily 高频用法笔记，作为内部文档； ② 前期我 pair 着几个同事改 PR，边改边讲响应器和生命周期； ③ 复杂联动遇到难题时我顶上，事后把方案总结进文档。 大约半个月团队整体进入熟练状态。"})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"为什么不自研一套 schema 表单方案？"}),s.jsx("div",{className:"answer",children:'评估过。自研优势是"完全贴合业务"，劣势是要自己实现响应器、校验、动态增减等基础设施。 Formily 在这些方面已经相当成熟，我们没有独特到必须自研的需求。 做 B 端要克制"造轮子"的冲动，把时间花在业务和架构上更划算。'})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"Formily 和 AntD Form 有什么本质区别？"}),s.jsxs("div",{className:"answer",children:["AntD Form 是命令式的 —— 你 getFieldValue / setFieldValue，联动靠 useEffect。 Formily 是声明式的 + 响应式的 —— schema 里声明字段间的依赖关系，Formily 内部维护依赖图， 变化自动传播。最大的实际差别是",s.jsx("strong",{className:"em",children:"联动逻辑的集中度"}),"： AntD Form 联动散在业务代码，Formily 联动集中在 schema 里。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"x-reactions 里的表达式字符串是怎么求值的？有安全问题吗？"}),s.jsxs("div",{className:"answer",children:["Formily 用自己的表达式求值引擎，不是 ",s.jsx("code",{children:"eval"}),"。 表达式里可以访问 ",s.jsx("code",{children:"$self"}),"、",s.jsx("code",{children:"$deps"}),"、",s.jsx("code",{children:"$form"})," 等作用域， 也可以注册自定义 scope 函数。因为是受控的求值，没有任意代码执行风险。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"大表单性能怎么保证？60+ 字段不会卡？"}),s.jsxs("div",{className:"answer",children:["Formily 采用细粒度的响应式 —— 只有依赖某个字段的字段才会重渲染，不是整个表单重渲染。 我们最大的表单 60+ 字段，输入延迟感知不到。 如果未来遇到更大的表单（几百字段），可以用 ",s.jsx("code",{children:"<FormConsumer>"})," 做局部订阅、",s.jsx("code",{children:"<ArrayItems>"})," 开虚拟滚动等手段进一步优化。"]})]})]}),s.jsxs("h2",{className:"challenge-heading",children:[s.jsx("span",{className:"num",children:"05"}),"多环境构建"]}),s.jsx("p",{className:"challenge-lead",children:"dev / mock / gray / prod 四套环境，互不串味。"}),s.jsx("div",{className:"sub-h",children:"问题场景"}),s.jsxs("p",{children:["四套环境：",s.jsx("strong",{className:"em",children:"dev"}),"（开发）、",s.jsx("strong",{className:"em",children:"mock"}),"（mock 数据）、",s.jsx("strong",{className:"em",children:"gray"}),"（灰度）、",s.jsx("strong",{className:"em",children:"prod"}),"（生产）。 每套都有自己的后端域名、SSO 地址、日志上报地址。",s.jsx("strong",{className:"em",children:"不能让某个同事本地启动指错了 host 把脏数据写进生产"}),"， 也不能让灰度发版时不小心指向 dev 后端。"]}),s.jsx("div",{className:"sub-h",children:"功能实现架构图"}),s.jsxs("div",{className:"diagram","aria-label":"多环境构建架构图",children:[s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"启动命令（package.json scripts）"}),s.jsxs("div",{className:"block",children:["npm run dev",s.jsx("span",{className:"sub",children:"mode=dev"})]}),s.jsxs("div",{className:"block",children:["npm run dev-mock",s.jsx("span",{className:"sub",children:"mode=mock"})]}),s.jsxs("div",{className:"block",children:["npm run gray",s.jsx("span",{className:"sub",children:"mode=gray"})]}),s.jsxs("div",{className:"block",children:["npm run build",s.jsx("span",{className:"sub",children:"mode=production"})]}),s.jsxs("div",{className:"block",children:["npm run build-gray",s.jsx("span",{className:"sub",children:"mode=gray · 产物"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"环境注入（cross-env）"}),s.jsxs("div",{className:"block highlight",children:["process.env.mode",s.jsx("span",{className:"sub",children:"由 cross-env 注入"})]}),s.jsxs("div",{className:"block highlight",children:["hostEnum 枚举",s.jsx("span",{className:"sub",children:"src/config/index.ts 集中定义"})]})]}),s.jsxs("div",{className:"layer",children:[s.jsx("div",{className:"layer-label",children:"运行时消费"}),s.jsxs("div",{className:"block",children:["axios baseURL",s.jsx("span",{className:"sub",children:"config.host"})]}),s.jsxs("div",{className:"block",children:["SSO 地址",s.jsx("span",{className:"sub",children:"config.sso"})]}),s.jsxs("div",{className:"block",children:["proxy target（开发）",s.jsx("span",{className:"sub",children:".umirc.ts 的 /proxyApi"})]})]})]}),s.jsx("div",{className:"sub-h",children:"核心思路"}),s.jsxs("p",{children:[s.jsx("strong",{className:"em",children:"显式注入、集中声明、运行时单点消费"}),"。 不依赖默认值，不用 NODE_ENV 这种模糊变量；用 ",s.jsx("code",{children:"cross-env mode=xxx"})," 强制注入， 然后在 ",s.jsx("code",{children:"src/config/index.ts"})," 里用 ",s.jsx("code",{children:"hostEnum"})," 集中写所有环境的差异，业务代码只读 ",s.jsx("code",{children:"config"}),"。"]}),s.jsx("div",{className:"sub-h",children:"代码示例"}),s.jsx(a,{html:u}),s.jsx("div",{className:"sub-h",children:"关键细节"}),s.jsxs("ul",{className:"bullets",children:[s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"cross-env 跨平台注入"}),"：Windows / Mac / Linux 设置环境变量的语法不同，cross-env 统一封装。 团队里有 Windows 用户，这点很重要。"]}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"CI 脚本看一眼就知环境"}),"：发版脚本里是 ",s.jsx("code",{children:"npm run build-gray"})," 还是 ",s.jsx("code",{children:"npm run build"}),'， 一眼分得清。不存在"我不确定打的是哪个环境"。']}),s.jsxs("li",{children:[s.jsx("strong",{className:"em",children:"业务代码完全不感知环境"}),"：需要拿 host？读 ",s.jsx("code",{children:"import config from '@/config'"}),"。 需要判断是否 dev？读 ",s.jsx("code",{children:"process.env.NODE_ENV"}),"。不到处写 if/else。"]})]}),s.jsxs("div",{className:"qa","aria-label":"面试追问 Q&A",children:[s.jsxs("details",{children:[s.jsx("summary",{children:"mock 环境是怎么实现的？"}),s.jsxs("div",{className:"answer",children:["用 Umi 自带的 mock 能力，在 ",s.jsx("code",{children:"mock/"})," 目录下写 mock handler，",s.jsx("code",{children:"npm run dev-mock"}),"启动时 Umi 会拦截匹配的请求返回 mock 数据。好处是和 Umi 路由系统结合好、零配置； 不用 MSW 那种方案 —— MSW 更适合前端独立开发组件库，做大后台没必要引一层。"]})]}),s.jsxs("details",{children:[s.jsx("summary",{children:"灰度环境上线后发现问题怎么快速定位？"}),s.jsxs("div",{className:"answer",children:["灰度环境的请求带 ",s.jsx("code",{children:"X-Env: gray"}),' header，后端日志能区分；前端日志上报也带 mode 字段。 出问题时用"排查工具"（check-tool 模块）输入用户 ID 拉最近的请求链路，按环境过滤。 定位效率比直接看生产日志高得多。']})]})]}),s.jsxs("footer",{className:"pager","aria-label":"章节导航",children:[s.jsxs(n,{className:"prev",to:`${l}/decisions`,children:[s.jsx("span",{className:"dir",children:"← 上一节"}),s.jsx("span",{className:"lbl",children:"06 · 关键决策"})]}),s.jsxs(n,{className:"next",to:`${l}/impact`,children:[s.jsx("span",{className:"dir",children:"下一节 →"}),s.jsx("span",{className:"lbl",children:"08 · 项目成果"})]})]})]})]})}));export{v as default};
