import 'styles/web/base.css';
import 'styles/web/icons.css';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }) => {
  return (
    <div className="web-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
