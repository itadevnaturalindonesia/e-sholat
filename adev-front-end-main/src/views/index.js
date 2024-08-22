import React,{useEffect} from "react";
import { Route, Switch, Redirect, withRouter,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import jwt_decode from 'jwt-decode'
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig';
import PrivateRoute from 'components/custom-components/PrivateRoute'

export const Views = (props) => {
  let history = useHistory()
  useEffect(()=>{},[])

  const { locale, location } = props;
  const currentAppLocale = AppLocale[locale];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd}>
        <Switch>
          <PrivateRoute exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </PrivateRoute>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout />
          </Route>
          <PrivateRoute path={APP_PREFIX_PATH}>
            <AppLayout location={location}/>
          </PrivateRoute>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale } =  theme;
  const { token } = auth;
  return { locale, token }
};

export default withRouter(connect(mapStateToProps)(Views));