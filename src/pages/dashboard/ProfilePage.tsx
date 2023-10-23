/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { ButtonGroup, Container, Divider, Stack, Text, useDisclosure } from "@chakra-ui/react"
import CustomButton from "../../components/common/CustomButton"
import useSearchParam from "../../hooks/useSearchParam"
import { useLocation, useNavigate } from "react-router-dom"
import { DARK, TEXT_DARK_GRAY } from "../../utils/color"
import { useForm } from "react-hook-form"
import AuthInput from "../../components/common/AuthInput"
import { useAppSelector } from "../../store/hook"
import { FaRegUser } from "react-icons/fa"
import { IoMailOutline } from "react-icons/io5"
import { MdOutlinePhoneEnabled } from "react-icons/md"
import { log } from "../../utils/helpers"
import RoleUpgrade from "../../components/modals/RoleUpgrade"
import RoleUpgradeSuccess from "../../components/modals/RoleUpgradeSuccess"

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
  const { control } = useForm({
    mode: "onSubmit"
  })

  const { control: passwordControl, watch } = useForm<{
    oldpwd: string,
    pwd: string,
    confirm: string;
  }>({
    mode: "onSubmit"
  })

  const password = watch("pwd")

  const user = useAppSelector(state => state.accountStore.user)
  log('USER:', user)
  const handleSave = () => { }
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
                // labelStyles={{
                //   fontWeight: "500"
                // }}
                iconProp={{ fontSize: "xl" }}
                color={DARK}
                name="firstname"
                control={control}
                label="First name"
                Icon={FaRegUser}
                rules={{
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "Please enter a valid name"
                  }
                }}
              />

              <AuthInput
                // labelStyles={{
                //   fontWeight: "500"
                // }}
                iconProp={{ fontSize: "xl" }}
                color={DARK}
                name="lastname"
                control={control}
                label="Last name"
                Icon={FaRegUser}
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
                Icon={IoMailOutline}
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

              <CustomButton onClick={handleSave} w={"full"}>Save changes</CustomButton>
            </Stack>
            {/* ROLE UPGRADE */}
            <Divider my={4} />
            <Stack>
              <Text fontWeight={"600"} fontSize={"sm"} color={TEXT_DARK_GRAY}>Request role upgrade</Text>
              <CustomButton w={"fit-content"} colorScheme="gray" onClick={openRoleUpgrade} variant={"outline"}>SEND REQUEST</CustomButton>
            </Stack>
          </Stack>
        ) : (
          <Stack mt={8} spacing={4}>
            <Stack p={4} bg={"white"} rounded={"md"} spacing={4}>
              {/* PASSWORD */}
              <AuthInput
                control={passwordControl}
                name="oldpwd"
                type="password"
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
                isPassword
                label="Confirm Password"
                rules={{
                  validate: (value: string) => {
                    return value !== password ? "Wrong password" : undefined
                  }
                }}
              />
              <CustomButton onClick={handleSave} w={"full"}>Change password</CustomButton>
            </Stack>
          </Stack>
        )}
      </Container>

      <RoleUpgrade isOpen={isRoleUpgradeOpen} onClose={closeRoleUpgrade} />
      <RoleUpgradeSuccess isOpen={isRoleUpgradeSuccessOpen} onClose={closeRoleUpgradeSuccess} />
    </DashboardLayout>
  )
}

export default ProfilePage