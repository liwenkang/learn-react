// 工具函数
export function getRedirectPath({type, avatar}) {
  console.log('type', type);
  console.log('avatar', avatar);
  // 获取跳转地址
  // user.type => boss / genius
  // user.avatar => boss-info / genius-info
  let url = ((type === 'boss') ? '/boss' : '/genius');
  if (avatar) {
    // 用户信息完善了
  } else {
    // 跳转去完善信息
    url += 'info';
  }
  return url;
}