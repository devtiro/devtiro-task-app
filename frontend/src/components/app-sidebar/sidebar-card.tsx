import { LucideProps } from "lucide-react";

interface SidebarCardProps {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  value?: number;
  color: string;
  testId?: string;
}
const SidebarCard: React.FC<SidebarCardProps> = ({
  Icon,
  text,
  value,
  color,
  testId,
}) => {
  return (
    <div className="flex rounded bg-white/15 p-3 justify-between">
      <div>
        <div
          className={`rounded-full ${color} h-8 w-8 flex items-center justify-center mb-1`}
        >
          <Icon size={18} />
        </div>

        <p>{text}</p>
      </div>
      {testId ? (
        <div data-testId={testId}>
          {value && <p className="text-lg font-semibold">{value}</p>}
        </div>
      ) : (
        <div>{value && <p className="text-lg font-semibold">{value}</p>}</div>
      )}
    </div>
  );
};

export default SidebarCard;
