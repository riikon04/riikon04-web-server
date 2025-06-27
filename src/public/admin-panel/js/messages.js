// Store channels data
let channels = [];
let messageHistory = [];
let fieldCounter = 0;

// Fetch all Discord channels
const fetchChannels = async () => {
  try {
    const response = await fetch('/api/discord/messages/channels');
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to fetch channels');
    
    channels = data.channels;
    populateChannelSelect();
  } catch (error) {
    console.error('Error fetching channels:', error);
    document.getElementById('channelSelect').innerHTML = 
      '<option value="">Lỗi khi tải kênh. Vui lòng thử lại.</option>';
  }
};

// Populate channel select dropdown
const populateChannelSelect = () => {
  const channelSelect = document.getElementById('channelSelect');
  channelSelect.innerHTML = '<option value="">-- Chọn kênh --</option>';
  
  // Group channels by category
  const categories = channels.filter(channel => channel.type === 4);
  const textChannels = channels.filter(channel => channel.type !== 4);
  
  // Add categories and their channels
  categories.forEach(category => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = category.name;
    
    // Add channels that belong to this category
    const categoryChannels = textChannels.filter(channel => channel.parentId === category.id);
    categoryChannels.forEach(channel => {
      const option = document.createElement('option');
      option.value = channel.id;
      option.textContent = `# ${channel.name}`;
      optgroup.appendChild(option);
    });
    
    if (optgroup.children.length > 0) {
      channelSelect.appendChild(optgroup);
    }
  });
  
  // Add channels without a category
  const uncategorizedChannels = textChannels.filter(channel => !channel.parentId);
  
  if (uncategorizedChannels.length > 0) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = 'Kênh không phân loại';
    
    uncategorizedChannels.forEach(channel => {
      const option = document.createElement('option');
      option.value = channel.id;
      option.textContent = `# ${channel.name}`;
      optgroup.appendChild(option);
    });
    
    channelSelect.appendChild(optgroup);
  }
};

// Toggle between message types
const toggleMessageFields = () => {
  const messageType = document.querySelector('input[name="messageType"]:checked').value;
  const regularFields = document.getElementById('regularMessageFields');
  const embedFields = document.getElementById('embedMessageFields');
  
  if (messageType === 'regular') {
    regularFields.style.display = 'block';
    embedFields.style.display = 'none';
  } else {
    regularFields.style.display = 'none';
    embedFields.style.display = 'block';
  }
  
  updatePreview();
};

// Add a new field to the embed message
const addEmbedField = () => {
  const embedFields = document.getElementById('embedFields');
  fieldCounter++;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'card mb-2 embed-field';
  fieldGroup.dataset.fieldId = fieldCounter;
  fieldGroup.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="card-title mb-0">Field #${fieldCounter}</h6>
        <button type="button" class="btn btn-sm btn-danger remove-field-btn" data-field-id="${fieldCounter}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
      <div class="mb-2">
        <input type="text" class="form-control field-name" placeholder="Field Name" required>
      </div>
      <div class="mb-2">
        <textarea class="form-control field-value" placeholder="Field Value" rows="2" required></textarea>
      </div>
      <div class="form-check">
        <input class="form-check-input field-inline" type="checkbox" id="fieldInline${fieldCounter}">
        <label class="form-check-label" for="fieldInline${fieldCounter}">
          Inline
        </label>
      </div>
    </div>
  `;
  
  embedFields.appendChild(fieldGroup);
  
  // Add event listener for the remove button
  fieldGroup.querySelector('.remove-field-btn').addEventListener('click', function() {
    const fieldId = this.dataset.fieldId;
    removeEmbedField(fieldId);
  });
  
  // Add event listeners for updating preview
  fieldGroup.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
  });
  
  updatePreview();
};

// Remove a field from the embed message
const removeEmbedField = (fieldId) => {
  const field = document.querySelector(`.embed-field[data-field-id="${fieldId}"]`);
  if (field) {
    field.remove();
    updatePreview();
  }
};

// Update message preview
const updatePreview = () => {
  const previewContainer = document.getElementById('messagePreview');
  const messageType = document.querySelector('input[name="messageType"]:checked').value;
  
  if (messageType === 'regular') {
    const content = document.getElementById('messageContent').value;
    if (!content) {
      previewContainer.innerHTML = '<div class="alert alert-info">Nhập nội dung tin nhắn để xem trước.</div>';
      return;
    }
    
    // Format content with line breaks
    const formattedContent = content.replace(/\n/g, '<br>');
    previewContainer.innerHTML = `
      <div class="discord-message">
        <div class="discord-message-content">${formattedContent}</div>
      </div>
    `;
  } else {
    // Embed preview
    const title = document.getElementById('embedTitle').value;
    const description = document.getElementById('embedDescription').value;
    const color = document.getElementById('embedColor').value;
    const image = document.getElementById('embedImage').value;
    const thumbnail = document.getElementById('embedThumbnail').value;
    const footer = document.getElementById('embedFooter').value;
    const author = document.getElementById('embedAuthor').value;
    const contentText = document.getElementById('embedContentText').value;
    
    if (!title && !description && !image) {
      previewContainer.innerHTML = '<div class="alert alert-info">Thêm tiêu đề, mô tả hoặc hình ảnh để xem trước embed.</div>';
      return;
    }
    
    // Start building the embed preview
    let embedHTML = `
      <div class="discord-message">
        ${contentText ? `<div class="discord-message-content mb-2">${contentText.replace(/\n/g, '<br>')}</div>` : ''}
        <div class="discord-embed" style="border-left: 4px solid ${color}">
    `;
    
    // Author section
    if (author) {
      const authorIcon = document.getElementById('embedAuthorIcon').value;
      embedHTML += `
        <div class="discord-embed-author">
          ${authorIcon ? `<img src="${authorIcon}" class="discord-embed-author-icon">` : ''}
          <span>${author}</span>
        </div>
      `;
    }
    
    // Title
    if (title) {
      const url = document.getElementById('embedUrl').value;
      embedHTML += `
        <div class="discord-embed-title">
          ${url ? `<a href="${url}" target="_blank">${title}</a>` : title}
        </div>
      `;
    }
    
    // Description
    if (description) {
      embedHTML += `
        <div class="discord-embed-description">
          ${description.replace(/\n/g, '<br>')}
        </div>
      `;
    }
    
    // Fields
    const fieldElements = document.querySelectorAll('.embed-field');
    if (fieldElements.length > 0) {
      embedHTML += '<div class="discord-embed-fields">';
      
      fieldElements.forEach(fieldElement => {
        const fieldName = fieldElement.querySelector('.field-name').value;
        const fieldValue = fieldElement.querySelector('.field-value').value;
        const fieldInline = fieldElement.querySelector('.field-inline').checked;
        
        if (fieldName && fieldValue) {
          embedHTML += `
            <div class="discord-embed-field ${fieldInline ? 'discord-embed-field-inline' : ''}">
              <div class="discord-embed-field-name">${fieldName}</div>
              <div class="discord-embed-field-value">${fieldValue.replace(/\n/g, '<br>')}</div>
            </div>
          `;
        }
      });
      
      embedHTML += '</div>';
    }
    
    // Image
    if (image) {
      embedHTML += `
        <div class="discord-embed-image">
          <img src="${image}" style="max-width: 100%; max-height: 300px;">
        </div>
      `;
    }
    
    // Thumbnail
    if (thumbnail) {
      embedHTML += `
        <div class="discord-embed-thumbnail">
          <img src="${thumbnail}" style="max-width: 80px; max-height: 80px; float: right;">
        </div>
      `;
    }
    
    // Footer
    if (footer || document.getElementById('embedTimestamp').checked) {
      const footerIcon = document.getElementById('embedFooterIcon').value;
      embedHTML += `
        <div class="discord-embed-footer">
          ${footerIcon ? `<img src="${footerIcon}" class="discord-embed-footer-icon">` : ''}
          <span>
            ${footer || ''}
            ${document.getElementById('embedTimestamp').checked ? 
              (footer ? ' • ' : '') + new Date().toLocaleString() : ''}
          </span>
        </div>
      `;
    }
    
    embedHTML += '</div></div>';
    previewContainer.innerHTML = embedHTML;
  }
};

// Prepare embed data from form
const getEmbedData = () => {
  const embed = {
    title: document.getElementById('embedTitle').value,
    description: document.getElementById('embedDescription').value,
    color: document.getElementById('embedColor').value.replace('#', ''),
    url: document.getElementById('embedUrl').value || undefined,
    timestamp: document.getElementById('embedTimestamp').checked ? new Date().toISOString() : undefined,
    footer: undefined,
    author: undefined,
    image: document.getElementById('embedImage').value || undefined,
    thumbnail: document.getElementById('embedThumbnail').value || undefined,
    fields: []
  };
  
  // Footer
  const footerText = document.getElementById('embedFooter').value;
  const footerIcon = document.getElementById('embedFooterIcon').value;
  if (footerText || footerIcon) {
    embed.footer = {
      text: footerText || '',
      iconURL: footerIcon || undefined
    };
  }
  
  // Author
  const authorName = document.getElementById('embedAuthor').value;
  const authorIcon = document.getElementById('embedAuthorIcon').value;
  const authorUrl = document.getElementById('embedAuthorUrl').value;
  if (authorName || authorIcon || authorUrl) {
    embed.author = {
      name: authorName || '',
      iconURL: authorIcon || undefined,
      url: authorUrl || undefined
    };
  }
  
  // Fields
  const fieldElements = document.querySelectorAll('.embed-field');
  fieldElements.forEach(fieldElement => {
    const fieldName = fieldElement.querySelector('.field-name').value;
    const fieldValue = fieldElement.querySelector('.field-value').value;
    const fieldInline = fieldElement.querySelector('.field-inline').checked;
    
    if (fieldName && fieldValue) {
      embed.fields.push({
        name: fieldName,
        value: fieldValue,
        inline: fieldInline
      });
    }
  });
  
  return embed;
};

// Send message
const sendMessage = async (e) => {
  e.preventDefault();
  
  const channelId = document.getElementById('channelSelect').value;
  if (!channelId) {
    alert('Vui lòng chọn kênh để gửi tin nhắn');
    return;
  }
  
  const messageType = document.querySelector('input[name="messageType"]:checked').value;
  
  try {
    let payload;
    
    if (messageType === 'regular') {
      const content = document.getElementById('messageContent').value;
      if (!content) {
        alert('Vui lòng nhập nội dung tin nhắn');
        return;
      }
      
      payload = {
        channelId,
        messageType,
        content
      };
    } else {
      const embed = getEmbedData();
      
      // Validate embed has at least title, description or image
      if (!embed.title && !embed.description && !embed.image) {
        alert('Embed cần có ít nhất một tiêu đề, mô tả hoặc hình ảnh');
        return;
      }
      
      payload = {
        channelId,
        messageType,
        content: document.getElementById('embedContentText').value || '',
        embed
      };
    }
    
    const sendBtn = document.getElementById('sendMessageBtn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="bi bi-hourglass"></i> Đang gửi...';
    
    const response = await fetch('/api/discord/messages/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const data = await response.json();
    
    if (!data.success) throw new Error(data.message || 'Failed to send message');
    
    alert('Tin nhắn đã được gửi thành công!');
    
    // Add to message history
    const channelName = channels.find(c => c.id === channelId)?.name || channelId;
    const messageContent = messageType === 'regular' 
      ? payload.content.substring(0, 50) + (payload.content.length > 50 ? '...' : '')
      : (payload.embed.title || payload.embed.description || 'Embed message').substring(0, 50) + '...';
    
    messageHistory.unshift({
      time: new Date().toLocaleString(),
      channel: channelName,
      content: messageContent,
      type: messageType === 'regular' ? 'Thông thường' : 'Embed'
    });
    
    updateMessageHistory();
    
    // Reset form for convenience
    if (messageType === 'regular') {
      document.getElementById('messageContent').value = '';
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert(`Lỗi: ${error.message}`);
  } finally {
    const sendBtn = document.getElementById('sendMessageBtn');
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i class="bi bi-send me-1"></i> Gửi tin nhắn';
  }
};

// Update message history table
const updateMessageHistory = () => {
  const historyContainer = document.getElementById('messages-history');
  
  if (messageHistory.length === 0) {
    historyContainer.innerHTML = '<tr><td colspan="4" class="text-center">Chưa có tin nhắn nào được gửi</td></tr>';
    return;
  }
  
  historyContainer.innerHTML = '';
  
  messageHistory.forEach(message => {
    historyContainer.innerHTML += `
      <tr>
        <td>${message.time}</td>
        <td>${message.channel}</td>
        <td>${message.content}</td>
        <td><span class="badge ${message.type === 'Embed' ? 'bg-primary' : 'bg-secondary'}">${message.type}</span></td>
      </tr>
    `;
  });
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Load channels
  fetchChannels();
  
  // Set up event listeners
  document.querySelectorAll('input[name="messageType"]').forEach(radio => {
    radio.addEventListener('change', toggleMessageFields);
  });
  
  document.getElementById('addFieldBtn').addEventListener('click', addEmbedField);
  
  document.getElementById('messageForm').addEventListener('submit', sendMessage);
  
  document.getElementById('refreshHistoryBtn').addEventListener('click', () => {
    alert('Tính năng đang được phát triển');
  });
  
  // Set up input change listeners for preview
  document.querySelectorAll('#regularMessageFields input, #regularMessageFields textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
  });
  
  document.querySelectorAll('#embedMessageFields input, #embedMessageFields textarea, #embedMessageFields select').forEach(input => {
    input.addEventListener('input', updatePreview);
  });
  
  // Add custom CSS for Discord message preview
  const style = document.createElement('style');
  style.textContent = `
    .discord-message {
      background-color: #36393f;
      color: #dcddde;
      padding: 16px;
      border-radius: 4px;
      font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .discord-message-content {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .discord-embed {
      background-color: #2f3136;
      border-radius: 4px;
      padding: 8px 16px 16px;
      max-width: 520px;
    }
    
    .discord-embed-title {
      color: #ffffff;
      font-weight: 600;
      font-size: 16px;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    
    .discord-embed-title a {
      color: #00b0f4;
      text-decoration: none;
    }
    
    .discord-embed-description {
      color: #dcddde;
      font-size: 14px;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    
    .discord-embed-fields {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    
    .discord-embed-field {
      margin-bottom: 12px;
      min-width: 100%;
    }
    
    .discord-embed-field-inline {
      min-width: calc(50% - 8px);
      flex: 1;
      margin-right: 16px;
    }
    
    .discord-embed-field-name {
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
    }
    
    .discord-embed-field-value {
      color: #dcddde;
      font-size: 14px;
      line-height: 1.3;
    }
    
    .discord-embed-author {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }
    
    .discord-embed-author-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .discord-embed-footer {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 12px;
      color: #a3a6aa;
    }
    
    .discord-embed-footer-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    .discord-embed-image img {
      border-radius: 4px;
      margin-top: 16px;
    }
  `;
  document.head.appendChild(style);
});
