"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  mockConversations, 
  mockMessages, 
  formatMessageTime,
  getOnlineStatus,
  type Conversation
} from "@/lib/mock-data";
import { 
  Search, 
  Send,
  Video,
  Pin,
  VolumeX,
  ChevronLeft,
  MessageSquare,
  Image as ImageIcon
} from "lucide-react";

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const filteredConversations = mockConversations.filter(conv => {
    const participant = conv.participants[0];
    return participant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           participant.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Auto-select first conversation ONLY on desktop initial load
  useEffect(() => {
    // Check if we're in browser and on desktop
    if (typeof window !== 'undefined') {
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      
      // Only auto-select on desktop, and only if nothing is selected
      if (isDesktop && !selectedConversation && mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-6">
          
          {/* Messages Container */}
          <div className="section-glass rounded-2xl overflow-hidden">
            <div className="flex h-[calc(100vh-16rem)]">
              
              {/* Conversations List */}
              <div className={cn(
                "w-full border-r border-border/30 lg:w-96",
                selectedConversation && "hidden lg:block"
              )}>
                {/* Search Bar */}
                <div className="p-4 border-b border-border/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-border/50"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="h-[calc(100%-5rem)] overflow-y-auto p-3 space-y-2">
                  {filteredConversations.map((conversation) => {
                    const participant = conversation.participants[0];
                    const isSelected = selectedConversation?.id === conversation.id;
                    
                    return (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={cn(
                          "flex w-full items-start gap-3 p-4 text-left transition-all",
                          "bg-white rounded-lg shadow-sm border border-border/20",
                          "hover:shadow-md hover:border-primary/20",
                          isSelected && "border-primary"
                        )}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={participant.avatar}
                            alt={participant.displayName}
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-background"
                          />
                          {participant.isOnline && (
                            <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground">{participant.displayName}</h3>
                              <p className="text-sm text-muted-foreground">@{participant.username}</p>
                            </div>
                            <div className="text-right ml-2">
                              <p className="text-xs text-muted-foreground">
                                {formatMessageTime(conversation.lastMessage.timestamp)}
                              </p>
                              {conversation.unreadCount > 0 && (
                                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {conversation.lastMessage.type === 'image' && (
                              <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <p className="truncate text-sm text-muted-foreground">
                              {conversation.lastMessage.type === 'image' 
                                ? 'Photo' 
                                : conversation.lastMessage.content}
                            </p>
                          </div>
                          {(conversation.isPinned || conversation.isMuted) && (
                            <div className="mt-1 flex gap-2">
                              {conversation.isPinned && (
                                <Pin className="h-3 w-3 text-primary" />
                              )}
                              {conversation.isMuted && (
                                <VolumeX className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Thread */}
              {selectedConversation ? (
                <div className="flex flex-1 flex-col">
                  {/* Message Header */}
                  <div className="flex items-center justify-between border-b border-border/30 p-4 bg-muted/10">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBackToList}
                        className="lg:hidden p-2 hover:bg-muted/20 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <div className="relative">
                        <img
                          src={selectedConversation.participants[0].avatar}
                          alt={selectedConversation.participants[0].displayName}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
                        />
                        {selectedConversation.participants[0].isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {selectedConversation.participants[0].displayName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getOnlineStatus(
                            selectedConversation.participants[0].isOnline,
                            selectedConversation.participants[0].lastSeen
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-muted/20"
                      >
                        <Video className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages
                      .filter(msg => msg.conversationId === selectedConversation.id)
                      .map((message) => {
                        const isSent = message.senderId === 'current-user';
                        
                        return (
                          <div
                            key={message.id}
                            className={cn(
                              "flex items-end gap-2",
                              isSent && "flex-row-reverse"
                            )}
                          >
                            {!isSent && (
                              <img
                                src={message.senderAvatar}
                                alt={message.senderName}
                                className="h-8 w-8 rounded-full object-cover ring-2 ring-background"
                              />
                            )}
                            <div
                              className={cn(
                                "max-w-[70%] rounded-2xl px-4 py-2.5",
                                isSent
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-white"
                              )}
                            >
                              {message.type === 'image' ? (
                                <div>
                                  <img
                                    src={message.imageUrl}
                                    alt="Shared image"
                                    className="rounded-lg max-w-full"
                                  />
                                  {message.content && (
                                    <p className="mt-2">{message.content}</p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-sm">{message.content}</p>
                              )}
                              <p
                                className={cn(
                                  "mt-1 text-xs",
                                  isSent
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                )}
                              >
                                {formatMessageTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-border/30 p-4 bg-muted/10">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="hover:bg-muted/20"
                      >
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-white border-border/50"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden flex-1 items-center justify-center lg:flex">
                  <div className="text-center p-8">
                    <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}