/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { ButtonGroup, Container, Divider, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import useSearchParam from "../../hooks/useSearchParam"
import { useLocation, useNavigate } from "react-router-dom"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"
import { useForm } from "react-hook-form"
import AuthInput from "../../components/common/AuthInput"
import { useAppSelector } from "../../store/hook"
import { MdOutlinePhoneEnabled } from "react-icons/md"
import RoleUpgrade from "../../components/modals/RoleUpgrade"
import RoleUpgradeSuccess from "../../components/modals/SuccessModal"
import { MailIcon, UserIcon } from "../../components/icons"
import { executeUpdateProfile } from "../../apis/auth"
import { useAppContext } from "../../contexts/AppContext"

interface ProfilePageProps { }
const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { queryParam: activeTab } = useSearchParam("tab")
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // MODAL CONTROLS
  const { isOpen: isRoleUpgradeOpen, onOpen: openRoleUpgrade, onClose: closeRoleUpgrade } = useDisclosure()
  const { isOpen: isRoleUpgradeSuccessOpen, onClose: closeRoleUpgradeSuccess } = useDisclosure()

  useEffect(() => {
    if (activeTab) return
    navigate(`${pathname}?tab=general-settings`)
  }, [])

  const handleTabChange = (e: ChangeEvent<HTMLButtonElement>) => {
    navigate(`${pathname}?tab=${e.target.name.toLowerCase()}`)
  }

  const isGeneral = activeTab?.toLowerCase() === "general-settings"
  const { control, getValues, trigger } = useForm<UpdateProfile>({
    mode: "onSubmit"
  })

  const { getUsersProfile } = useAppContext()
  const user = useAppSelector(state => state.accountStore.user)
  const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })

  const handleSave = async () => {
    if (!await trigger()) return
    try {
      openLoading()
      const payload: UpdateProfile = {
        ...getValues(),
        id: user!.user.id!
      }

      const result = await executeUpdateProfile(payload, token!)
      if (result.status === "error") throw new Error(result.message)
      console.log("RESULT:", result)
      toast({
        title: result.message,
        status: "success"
      })

      // UPDATE PROFILE STATE
      getUsersProfile(token!)
    }
    catch (e: any) {
      toast({
        title: e.message,
        status: "error"
      })
    }
    finally {
      closeLoading()
    }
  }
  return (
    <DashboardLayout>
      <Container maxW={"md"} mx={"unset"}>
        <Stack>
          <ButtonGroup w={"full"} maxW={"400px"} p={1} bg={"white"} rounded={"sm"}>
            <CustomButton colorScheme={isGeneral ? "primary" : "gray"} onClick={handleTabChange as any} bg={isGeneral ? "primary.500" : "white"} color={isGeneral ? "white" : DARK} textTransform={"capitalize"} flex={1} variant={"solid"} name="general-settings" >General settings</CustomButton>

            <CustomButton colorScheme={!isGeneral ? "primary" : "gray"} onClick={handleTabChange as any} bg={!isGeneral ? "primary.500" : "white"} name="change-password" color={!isGeneral ? "white" : DARK} textTransform={"capitalize"} flex={1}>Change Password</CustomButton>
          </ButtonGroup>
        </Stack>

        {isGeneral ? (
          <Stack mt={8} spacing={4}>
            <Stack p={4} bg={"white"} rounded={"md"} spacing={4}>
              <AuthInput
                iconProp={{ fontSize: "xl" }}
                color={DARK}
                name="firstname"
                control={control}
                label="First name"
                value={user?.user.firstname}
                isIconComponent
                Icon={<UserIcon w={"24px"} h={"24px"} fill={"#A3AEBD"} />}
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name"
                  }
                }}
              />

              <AuthInput
                iconProp={{ fontSize: "xl" }}
                color={DARK}
                name="lastname"
                control={control}
                label="Last name"
                value={user?.user.lastname}
                Icon={<UserIcon w={"24px"} h={"24px"} fill={"#A3AEBD"} />}
                isIconComponent
                rules={{
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name"
                  }
                }}
              />

              <AuthInput
                labelStyles={{
                  fontWeight: "500"
                }}
                control={control}
                name="email"
                type="email"
                value={user?.user.email}
                isIconComponent
                Icon={<MailIcon w={"24px"} h={"24px"} fill={"#363A43"} stroke={"#A3AEBD"} />}
                label="Email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Please enter a valid email address"
                  }
                }}
              />

              <AuthInput
                control={control}
                name="mobile"
                type="tel"
                Icon={MdOutlinePhoneEnabled}
                value={user?.user.mobile_number}
                iconProp={{ w: "24px", h: "24px" }}
                label="Phone no"
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 11,
                    message: "Please enter a valid phone number"
                  },
                  maxLength: {
                    value: 15,
                    message: "Please enter a valid phone number"
                  },
                }}
              />

              <CustomButton isLoading={isLoading} onClick={handleSave} w={"full"}>Save changes</CustomButton>
            </Stack>
            {/* ROLE UPGRADE */}
            <Divider my={4} />
            <Stack>
              <Text fontWeight={"600"} fontSize={"sm"} color={TEXT_DARK_GRAY}>Request role upgrade</Text>
              <CustomButton w={"fit-content"} colorScheme="gray" onClick={openRoleUpgrade} variant={"outline"}>SEND REQUEST</CustomButton>
            </Stack>
          </Stack>
        ) : (
          <PasswordForm />
        )}
      </Container>

      <RoleUpgrade isOpen={isRoleUpgradeOpen} onClose={closeRoleUpgrade} />
      <RoleUpgradeSuccess
        title="Request sent successfully"
        text="You won't be able to do this again until after 30 days. Check your notification section for confirmation or rejection of your request"
        isOpen={isRoleUpgradeSuccessOpen}
        onClose={closeRoleUpgradeSuccess}
      />
    </DashboardLayout>
  )
}

export default ProfilePage





// PASSWORD FORM
const PasswordForm = () => {
  // const token = useAppSelector(state => state.accountStore.tokenStore?.token)
  const { isOpen: isLoading, onOpen: openLoading, onClose: closeLoading } = useDisclosure()
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  })
  const { control: passwordControl, watch: passWatch, trigger } = useForm({
    mode: "onSubmit"
  })
  const password = passWatch("pwd")

  const handlePasswordChange = async () => {
    if(!await trigger()) return
    try {
      openLoading()
      // const result = await ex
      // toast({
      //   title: result.,
      //   status: "error"
      // })
    }
    catch(e: any) {
      toast({
        title: e.message,
        status: "error"
      })
    }
    finally {
      closeLoading()
    }
  }

  return (
    <Stack mt={8} spacing={4}>
      <Stack p={4} bg={"white"} rounded={"md"} spacing={4}>
        {/* PASSWORD */}
        <AuthInput
          control={passwordControl}
          name="oldpwd"
          type="password"
          value={""}
          isPassword
          label="Old password"
          rules={{
            required: "Old passwprd is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters."
            }
          }}
        />

        <AuthInput
          control={passwordControl}
          name="pwd"
          type="password"
          value={""}
          isPassword
          label="Password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters."
            }
          }}
        />

        {/* C PASWORD */}
        <AuthInput
          control={passwordControl}
          name="confirm"
          type="password"
          value={""}
          isPassword
          label="Confirm Password"
          rules={{
            validate: (value: string) => {
              return value !== password ? "Wrong password" : undefined
            }
          }}
        />
        <CustomButton isLoading={isLoading} onClick={handlePasswordChange} w={"full"}>Change password</CustomButton>
      </Stack>
    </Stack>
  )
}