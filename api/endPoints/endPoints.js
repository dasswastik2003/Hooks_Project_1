export const endPoints = {
    auth: {
        sign_in: `/auth/login`,
        sign_up: `/auth/register`,
        profile_details: `/user/signup`,
        otp: `/auth/verify-otp`
    }
}

export const points = [
    endPoints.auth.sign_in,
    endPoints.auth.sign_up,
    endPoints.auth.profile_details,
    endPoints.auth.otp
]