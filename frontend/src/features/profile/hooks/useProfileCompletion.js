export const useProfileCompletion = (user) => {
    let score = 0

    if (user?.fullname) score += 10
    if (user?.phoneNumber) score += 10
    if (user?.profile?.bio) score += 15
    if (user?.profile?.skills?.length) score += 20
    if (user?.profile?.resume) score += 25
    if (user?.profile?.profilePhoto) score += 20

    return score
}
