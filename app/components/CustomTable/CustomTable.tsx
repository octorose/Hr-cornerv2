import { it } from "node:test";
import React from "react";

interface TableHeaderProps {
  header: string;
  index: number;
  totalHeaders: number;
}
const TableHeader: React.FC<TableHeaderProps> = ({
  header,
  index,
  totalHeaders,
}) => {
  const isFirst = index === 0;
  const isLast = index === totalHeaders - 1;

  const classNames = `py-3.5 pl-4 pr-3 text-center font-medium text-sm text-neutral-500
    ${isFirst ? "rounded-l-xl" : ""}
    ${isLast ? "rounded-r-xl" : ""}`;

  return <th className={classNames}>{header}</th>;
};

function CustomTable({ headres, data2 }: { headres: string[]; data2: any }) {

//console.log(data2);

  return (
    <div className="w-full">
      <table className="min-w-full mt-6 ">
        <thead className="rounded-t-xl rounded-b-xl">
          <tr className="rounded-lg h-12 w-full flex-shrink-0 bg-ft-gray-dark-blue rounded-t-xl rounded-b-xl">
            {headres?.map((header, index) => (
              <TableHeader
                key={index}
                header={header}
                index={index}
                totalHeaders={headres.length}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data2 &&
            data2.data.map((item: any, index: React.Key | null | undefined) => (
              <tr className="p-2 text-center rounded-t-lg rounded-b-lg text-neutral-500 hover:border-ft-lt/30 cursor-pointer">
                {Object.values(item).map((value, index) =>
                  index < headres.length ? (
                    <td
                      key={index}
                      className="py-4 px-6 border-b border-neutral-200"
                    >
                      {item[headres[index]]}
                    </td>
                  ) : null
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
