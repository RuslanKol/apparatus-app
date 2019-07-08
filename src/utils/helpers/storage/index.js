const domain = window.location.hostname;

export const deleteCookie = cname => {
  document.cookie =
    cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=' + domain + ';';
};

export const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/; domain=' + domain + ';';
};

export const loadState = () => {
  let state = { auth: {}, legal: { cookies: { accepted: false }, terms: { accepted: false } } };

  try {
    let c = document.cookie.split('; ');
    let cookies = {};

    for (let i = c.length - 1; i >= 0; i--) {
      let s_c = c[i].split('=');
      cookies[s_c[0]] = s_c[1];
    }

    if (cookies.jwt) {
      state.auth = {};

      state.auth.jwt = cookies.jwt;
      state.auth.authenticated = true;

      if (cookies.directive_id) {
        state.auth.directive_id = cookies.directive_id;
      }
    }

    if (cookies.accepted_cookies) {
      state.legal.cookies.accepted = cookies.accepted_cookies;
    }

    if (cookies.accepted_terms) {
      state.legal.terms.accepted = cookies.accepted_terms;
    }

    return state;
  } catch (err) {
    return state;
  }
};

export const saveState = state => {
  try {
    if (state.auth && state.auth.authenticated) {
      setCookie('authenticated', 'true', 2);
    }
    if (state.auth && state.auth.jwt) {
      setCookie('jwt', state.auth.jwt, 2);
    }
    if (state.auth && state.auth.directive_id) {
      setCookie('directive_id', state.auth.directive_id, 2);
    }
    if (state.legal && state.legal.cookies && state.legal.cookies.accepted) {
      setCookie('accepted_cookies', state.legal.cookies.accepted, 90);
    }
    if (state.legal && state.legal.terms && state.legal.terms.accepted) {
      setCookie('accepted_terms', state.legal.terms.accepted, 90);
    }
  } catch (err) {
    console.log(err);
    // Handle errors
  }
};
