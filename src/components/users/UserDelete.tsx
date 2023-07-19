import React from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { useDeleteUserMutation } from '@/redux/services/userApi'
import { removeUserToDelete, setUsersInPage } from '@/redux/features/userSlice'
import { Button } from '@/styles/StyledButton'
import { ModalBody, ModalContainer, ModalTilte, ModalFooter, Modal } from '@/styles/StyledModal'
import { useTheme } from 'styled-components'
import { toast } from 'react-hot-toast'

export default function UserDelete() {
  const { userToDelete, usersInPage } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()
  const [deleteUser] = useDeleteUserMutation()

  const theme = useTheme()

  const handleDelete = async () => {
    if (userToDelete?.id) {
      const result = await deleteUser(userToDelete.id)

      if ('error' in result) {
        toast.error('User could not be deleted')
      } else {
        const filteredUsers = usersInPage.filter((user) => userToDelete.id !== user.id)
        dispatch(setUsersInPage([...filteredUsers]))
        toast.success('User deleted successfully')
      }

      dispatch(removeUserToDelete())
    }
  }

  const handleCancel = () => {
    dispatch(removeUserToDelete())
  }

  return (
    <Modal>
      <ModalContainer>
        <ModalTilte>Delete</ModalTilte>

        <ModalBody>Do you want to delete user: {userToDelete?.name} ?</ModalBody>

        <ModalFooter>
          <Button $backgroundcolor={theme.buttons.backgrounds.gray} onClick={handleCancel}>
            Cancel
          </Button>
          <Button $backgroundcolor={theme.buttons.backgrounds.red} onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  )
}
