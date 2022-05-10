import FoogleLogo from "assets/svg/foogle-logo.svg";
import { Products } from "common/components/Products";
import { StoreOptions } from "common/components/StoreOptions";

export const HomePage = (): JSX.Element => {
  return (
    <div>
      <div className="relative mb-16">
        <div className="h-72">
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src="https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=800,height=250,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/store/header/f5088659-0a24-4bd1-876c-d37292cb566d.jpg"
              alt="store-banner"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-8 h-20 w-20 rounded-full overflow-hidden translate-y-1/2 shadow-xl">
          <img src={FoogleLogo} alt="store-logo" className="object-cover" />
        </div>
      </div>
      <div>
        <StoreOptions />
        <Products />
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0744030517058!2d108.21154651484412!3d16.061628388885598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219b586c9fef3%3A0x7a420f614d1d86a4!2zMTYwIMSQLiBOZ3V54buFbiBIb8OgbmcsIEjhuqNpIENow6J1IDIsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1652173671105!5m2!1svi!2s"
          width="600"
          height="450"
          loading="lazy"
        ></iframe> */}
      </div>
    </div>
  );
};
