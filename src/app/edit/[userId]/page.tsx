import UserEdit from '@/components/users/UserEdit'

interface IProps {
  params: {
    userId: string
  }
}

export default function UserEditPage({ params }: IProps) {
  return <UserEdit userId={params.userId} />
}
