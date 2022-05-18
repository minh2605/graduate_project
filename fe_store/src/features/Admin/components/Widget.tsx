import { Chart } from "features/Admin/components/Chart";

interface WidgetProps {
  className?: string;
  name: string;
  icon: JSX.Element;
}
export const Widget = ({ className, name, icon }: WidgetProps): JSX.Element => {
  return (
    <div className={`p-4 border rounded-xl ${className ?? ""}`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-light-red flex items-center justify-center">
          <span>{icon}</span>
        </div>
        <div>
          <h3 className="text-h3 font-medium">{name}</h3>
        </div>
      </div>
      <div className="w-full h-full">
        <Chart />
      </div>
    </div>
  );
};
