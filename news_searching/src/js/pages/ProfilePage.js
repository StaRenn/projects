import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getProfileInfo, logOut} from "../AC";
import ReactLoading from "react-loading"

export const ProfilePage = () => {

    const dispatch = useDispatch()
    const profileData = useSelector(state => state.user.userData)

    useEffect(() => {
        if(!profileData.loaded && profileData.userId) {
            dispatch(getProfileInfo(profileData.userId))
        }
    }, [])

    if (!localStorage.getItem("authorized")){
        return <Redirect to={"/login"} />
    }

    const showError = () => {
        return (
            <div className="profile-page__frame">
                <p className={"message-box"}>{profileData.error ? profileData.error.replace(/_/g, " ") : ""}</p>
            </div>
        )
    }

    const handleLogOut = () => {
        try {
            localStorage.clear()
        }catch(e) {}
        dispatch(logOut());
        return <Redirect to={"/login"} />
    }

    const showProfile = () => {
        return (
            !profileData.loaded
                ? <div className="profile-page__frame">
                    <ReactLoading type={"spinningBubbles"} color={"black"} height={`100px`} width={`100px`}/>
                </div>
                : <div className="profile-page__frame">
                    <h2 className={"profile-page__frame__title"}>Profile</h2>
                    <h3 className={"profile-page__frame__city"}>City: {profileData.city}</h3>
                    <h3 className={"profile-page__frame__languages"}>Languages: {profileData.languages.join(", ")}</h3>
                    <section className="profile-page__frame__social-medias">
                        {profileData.social.map(socialMedia => {
                            return <a href={socialMedia.link} className={`profile-page__frame__social-medias__button ${socialMedia.label}-icon`}/>
                        })}
                    </section>
                    <button onClick={handleLogOut} className="profile-page__log-out action-button">Log Out</button>
                </div>
        )
    }

    return(
        <div className="profile-page">
            {profileData.error
            ? showError()
            : showProfile()}
        </div>
    )
}