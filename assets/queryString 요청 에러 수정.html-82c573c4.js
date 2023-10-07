import{_ as s,r as t,o as l,c as d,a as r,b as e,d as n,e as a}from"./app-c3f097b6.js";const o="/cherry1004/assets/written_query_test-527ea132.png",c={},u=a('<h1 id="특수-문자-쿼리에-발생한-문제" tabindex="-1"><a class="header-anchor" href="#특수-문자-쿼리에-발생한-문제" aria-hidden="true">#</a> 특수 문자 쿼리에 발생한 문제</h1><p>진행중인 프로젝트에서 페이지네이션 요청 쿼리에 문제가 발생했다.</p><ol><li>불특정 특수문자가 불규칙적으로 인코딩 안됨<br> : &#39;%&#39;, &#39;\\&#39;, &#39;[&#39; 등 인코딩 되어야 할 특수문자들이 인코딩 되지 않고 요청이 나감</li><li>null 대체 스트링 &#39;%00&#39; 이 가끔 &#39;%2500&#39; 으로 인코딩 됨 : &#39;EMPTY&#39; 대체 문자 &#39;%00&#39; 은 인코딩 되면 안되는데, &#39;%2500&#39; 으로 인코딩 됨</li><li>&#39; &#39;(spacebar)가 새로고침하면 &#39;+&#39; 로 바뀜 : 최초 페이지 진입시엔 저장된 &#39; &#39; 포함 쿼리가 잘 적용되지만, 새로고침을 하면 &#39;+&#39;로 바뀌어 적용됨</li></ol><p>특히, 불특정 특수문자가 불규칙적으로 인코딩 안되는 문제는, 말 그대로 페이지 별로, 필터 별로, 문제가 생기는 지점을 특정하는데에 어려움이 있었다.</p><h1 id="쿼리-업데이트-시-인코딩-디코딩-방식-불일치-문제" tabindex="-1"><a class="header-anchor" href="#쿼리-업데이트-시-인코딩-디코딩-방식-불일치-문제" aria-hidden="true">#</a> 쿼리 업데이트 시 인코딩/디코딩 방식 불일치 문제</h1>',5),v={href:"https://wiki.crscube.io/pages/viewpage.action?pageId=805538574",target:"_blank",rel:"noopener noreferrer"},m=a(`<ol><li>필터로 직접 수정</li><li>API로 저장되어있던 쿼리 요청</li><li>URL 에 포함되어 있던 쿼리 불러오기</li></ol><p>각 end-point 에서 쿼리 인코딩 하는 방식을 종합해보면 총 세가지이다.</p><ol><li>URLSearchParams.toString 을 사용한 인코딩</li><li>axios 인터셉트에서 설정한 query-string.js 를 사용한 인코딩</li><li>vue-router 의 push/replace 메서드에 기본 설정된 인코딩</li></ol><p>쿼리를 디코딩 하는 방식은 다음과 같다</p><ol><li>쿼리스트링 유틸 메서드에서 사용하는 decodeURIComponent 메서드를 사용한 디코딩</li></ol><p>axios 관련 설정은 다음과 같다.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>axios.defaults.paramsSerializer = {
  serialize: (params) =&gt; {
    const flattenParams = ObjectUtils.flat(params, &#39;&#39;, false);
    return queryString.stringify(flattenParams, {arrayFormat: &#39;comma&#39;});
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),p={href:"https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams",target:"_blank",rel:"noopener noreferrer"},b={href:"https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding",target:"_blank",rel:"noopener noreferrer"},g={href:"https://router.vuejs.org/guide/migration/#-route-properties-Encoding",target:"_blank",rel:"noopener noreferrer"},h=a('<h1 id="단위-테스트-작성" tabindex="-1"><a class="header-anchor" href="#단위-테스트-작성" aria-hidden="true">#</a> 단위 테스트 작성</h1><p>쿼리스트링을 업데이트하는 메서드는 다양하다. 각 메서드가 알맞은 인코딩/디코딩 방식이 일치됐는지 수정 후 일일히 검사하지 않게 하기 위헤 메서드별 단위 테스트를 작성하였다.<br> mr: https://gitlab.crsdev.io/ctms/ctms-webapp/-/merge_requests/896/<br><img src="'+o+`" alt="written_query_test"></p><p>테스트엔 vitest 와 vue-testing-library 를 사용하였다 (https://wiki.crscube.io/pages/viewpage.action?pageId=757714954)</p><h1 id="인코딩-디코딩-방식-통일" tabindex="-1"><a class="header-anchor" href="#인코딩-디코딩-방식-통일" aria-hidden="true">#</a> 인코딩/디코딩 방식 통일</h1><p>상기했듯이, 적용되어있던 인코딩/디코딩 방식이 일치하지 않는 부분이 있다. query-string.js 라이브러리를 사용한 serializer, parser 메서드를 구현하여 axios, vue-router 에 적용하였고, 직접 수정하는 로직도 각각 수정하였다.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import { ObjectUtils } from &#39;@/utils&#39;;
import QueryString from &#39;query-string&#39;;

export const stringifyQuery = (queryObject: Record&lt;string, any&gt;) =&gt; {
  const flattenParams = ObjectUtils.flat(queryObject, &#39;&#39;, false);
  return QueryString.stringify(flattenParams, {arrayFormat: &#39;comma&#39;, strict: false});
};

export const parseQuery = (queryString: string): Record&lt;string, any&gt; =&gt; {
  if (queryString.length === 0) {
    return {};
  }

  return QueryString.parse(queryString);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// axios
axios.defaults.paramsSerializer = {
  serialize: stringifyQuery
};

// vue-router
const router = createRouter({
  history: createWebHistory(),
  routes,
  stringifyQuery
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>commit: https://gitlab.crsdev.io/ctms/ctms-webapp/-/merge_requests/906/diffs?commit_id=b34e944640a1624cfa8107fb3fd37f3e8ae4569d#d5ef75b923c05044aef6d710e719bed6453e8184</p>`,8);function _(f,y){const i=t("ExternalLinkIcon");return l(),d("div",null,[u,r("p",null,[r("a",v,[e("필터, 페이지네이션에 따른 queryString 변화 흐름 파악 - flow chart"),n(i)]),e("에 적어 두었듯, 쿼리를 업데이트하는 end-point 가 총 세 개가 있다.")]),m,r("p",null,[e("URLSearchParams 를 사용한 인코딩은 'application/x-www-form-urlcecoded' 방식을 사용한다. ("),r("a",p,[e("MDN"),n(i)]),e(").")]),r("p",null,[e("vue-router 에선 percent_encoding 방식을 사용한다 ("),r("a",b,[e("MDN-Percent Encoding"),n(i)]),e(", "),r("a",g,[e("Vue-router docs"),n(i)]),e(").")]),h])}const S=s(c,[["render",_],["__file","queryString 요청 에러 수정.html.vue"]]);export{S as default};
