import { INFORMATION_QUERYResult } from "../../../sanity.types";

export default function InformationContent({
  information,
}: {
  information: INFORMATION_QUERYResult;
}) {
  console.log(information);
  return <div>the information content</div>;
}
