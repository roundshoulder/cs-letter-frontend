import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserResult } from '../api/user/type';
import { useMutation, useQuery } from 'react-query';
import { getUser, updateProfile } from '../api/user';
import { css } from '@emotion/css';
import Theme from '../assets/Theme';
import Tag from '../components/Tag';
import BottomButton from '../components/BottomButton';
import { MdImage } from 'react-icons/md';
import imageCompression from 'browser-image-compression';

const title = css`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: ${Theme.fontWeight.semibold};
  gap: 5px;
  margin-top: 35px;
  margin-bottom: 5px;
  font-size: 16px;
`;

const editProfileContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const profileImgContainer = css`
  width: 90px;
  height: 90px;
  padding: 0px;
  border-radius: 90px;
  border: solid 4px ${Theme.color.black};
  overflow: hidden;
  margin-top: 20px;
`;

const imageIconContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.color.black};
  border-radius: 28px;
  width: 28px;
  height: 28px;
  right: 0px;
  bottom: 0px;
  z-index: 10;
  position: absolute;
`;

const bold = css`
  font-weight: ${Theme.fontWeight.semibold};
`;

const subtext = css`
  font-size: 11px;
  font-weight: ${Theme.fontWeight.semibold};
`;

const nicknameInput = css`
  width: 96%;
  border: none;
  border-radius: 0px;
  border-bottom: solid 1px ${Theme.color.grey};
`;

interface Form {
  nickname: string;
  profileImage: File | null;
  preview: string | ArrayBuffer | null;
}

function EditProfile() {
  const navigate = useNavigate();
  const memberToken = useLocation().pathname.split('/')[2];
  const [user, setUser] = useState<getUserResult | null>(null);
  const [form, setForm] = useState<Form>({
    nickname: '',
    profileImage: null,
    preview: null,
  });
  useQuery(['getUser', memberToken], () => getUser(memberToken), {
    onSuccess: (data: getUserResult) => {
      if (!data.isMe) {
        navigate(`/nopermission`);
      }
      setUser(data);
      setForm({
        ...form,
        nickname: data.kakaoNickname,
      });
    },
  });

  const { mutate } = useMutation(updateProfile, {
    onSuccess: async () => {
      navigate(`/u/${memberToken}`);
    },
    onError: () => {
      alert('프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append('memberUpdate', form.nickname);
    if (form.profileImage) {
      formData.append(
        'multipartFile',
        form.profileImage,
        `${memberToken}.jpeg`
      );
    }
    formData.forEach(d => console.log(d));
    mutate(formData);
  }, [mutate, form, memberToken]);

  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '70px',
        paddingBottom: '30px',
      }}
    >
      <div className={editProfileContainer}>
        <span className={bold}>프로필 수정</span>
        <label style={{ position: 'relative' }} htmlFor="profileImg">
          <div className={profileImgContainer}>
            <img
              src={
                form.preview ? (form.preview as string) : user?.kakaoProfileImg
              }
              alt="profile"
              style={{ width: '100%', height: `100%`, objectFit: 'cover' }}
            />
          </div>
          <div className={imageIconContainer}>
            <MdImage color={Theme.color.white} size={16} />
          </div>
        </label>
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple={false}
          style={{ display: 'none' }}
          onChange={async e => {
            if (e.target.files && e.target.files.length !== 0) {
              const file = e.target.files[0];
              const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 270,
                fileType: 'image/jpeg',
              };
              const compressedFile = await imageCompression(file, options);
              const compressedURL = await imageCompression.getDataUrlFromFile(
                compressedFile
              );
              setForm({
                ...form,
                profileImage: compressedFile,
                preview: compressedURL,
              });
            }
          }}
          id="profileImg"
        />
        <span className={subtext}>사진수정</span>
        <div className={title}>
          <Tag text="닉네임" />을 입력해주세요
        </div>
        <input
          className={nicknameInput}
          placeholder="10자 이내로 작성해주세요"
          value={form.nickname}
          onChange={e => {
            setForm({ ...form, nickname: e.target.value.slice(0, 10) });
          }}
          maxLength={10}
          spellCheck={false}
        />
      </div>
      <BottomButton
        enable={user?.kakaoNickname !== form.nickname || !!form.profileImage}
        onClick={() => onSubmit()}
      >
        수정하기
      </BottomButton>
    </div>
  );
}

export default EditProfile;
