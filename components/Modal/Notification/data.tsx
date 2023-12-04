import { AiOutlineCheck } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

export const notificationData = [
  {
    id: 1,
    text: " Your approval for ₦1,500,000 to be added to the operations account have been approved",
    iconture: (
      <p>
        {" "}
        <AiOutlineCheck />
      </p>
    ),
  },
  {
    id: 2,
    text: "Mrs Yakubu approved your cash entry for usage on ₦30,000 spent on transportation on 31/4/2025",
    iconture: (
      <p>
        {" "}
        <AiOutlineCheck />
      </p>
    ),
  },
  {
    id: 3,
    text: "Your approval to initiate a transaction of ₦3,000,000 has been declined",
    iconfalse: (
      <p>
        {" "}
        <GrClose />
      </p>
    ),
  },
  {
    id: 4,
    text: " Your approval to initiate a transaction of ₦3,000,000 has been declined",
    iconfalse: (
      <p>
        {" "}
        <GrClose />
      </p>
    ),
  },
  {
    id: 5,
    text: "Mrs Yakubu approved your cash entry for usage on ₦30,000 spent on transportation on 31/4/2025",
    iconture: (
      <p>
        {" "}
        <AiOutlineCheck />
      </p>
    ),
  },
  {
    id: 6,
    text: "Mrs Yakubu approved your cash entry for usage on ₦30,000 spent on transportation on 31/4/2025",
    iconfalse: (
      <p>
        {" "}
        <GrClose />
      </p>
    ),
  },
];
