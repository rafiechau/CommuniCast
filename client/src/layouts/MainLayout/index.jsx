import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import { selectLogin } from '@pages/Login/selectors';

const MainLayout = ({ children, login, locale, theme, intl: { formatMessage } }) => (
  <div>
    <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} theme={theme} login={login} />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  login: selectLogin,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  login: PropTypes.bool,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
