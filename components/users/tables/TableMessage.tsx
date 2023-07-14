import { Container } from "../styles/StyledContainers"

interface Iprops {
    dataError: boolean | undefined 
}

export default function TableMessage ({ dataError }: Iprops) {
    const message = dataError 
      ? 'Oh no, there was an error... Please try again later'
      : 'There is no data yet, create a new user by clicking on the "Add new" button at the top right'
    return (
      <Container>
        <p>{message}</p>
      </Container>
    )
  }