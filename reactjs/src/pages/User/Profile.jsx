import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EditProfileForm from '../../components/form/EditProfileForm';
import ChangePasswordForm from '../../components/form/ChangePasswordForm';

const ProfilePage = () => {
  const { user } = useAuth();
  const [mode, setMode] = useState('view'); // 'view' | 'edit' | 'password'
  const userId = user?.id || user?.sub;

  if (!user) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div>
      {mode === 'view' && (
        <div className="bg-gray-100 py-10">
          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
            <div className="flex items-center space-x-6">
              <img
                src={`https://i.pravatar.cc/150?u=${userId}`}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Tên Đăng Nhập: {user.name}
                </h2>
                <p className="text-gray-600">Gmail: {user.email}</p>
                <p className="text-sm text-blue-500 font-semibold capitalize">
                  Quyền: {user.role}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Mã người dùng (ID)</label>
                <p className="text-gray-800">{userId}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setMode('password')}
              >
                Đổi mật khẩu
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
                onClick={() => setMode('edit')}
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'edit' && (
        <EditProfileForm user={user} onCancel={() => setMode('view')} />
      )}

      {mode === 'password' && (
        <ChangePasswordForm onCancel={() => setMode('view')} />
      )}
    </div>
  );
};

export default ProfilePage;
