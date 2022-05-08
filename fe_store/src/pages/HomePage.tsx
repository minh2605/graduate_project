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
      </div>
    </div>
  );
};
