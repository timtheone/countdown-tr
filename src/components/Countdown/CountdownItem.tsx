import {
  Container,
  RemainingNumber,
  RemainingNumberText,
} from "./CountdownItem.style";

type Props = {
  item: number;
  integetPad: number;
  translation: string;
};

const CountdownItem = ({ item, integetPad, translation }: Props) => {
  return (
    <Container>
      <RemainingNumber>
        {String(item).padStart(integetPad, "0")}
      </RemainingNumber>
      <RemainingNumberText>{translation}</RemainingNumberText>
    </Container>
  );
};

export default CountdownItem;
