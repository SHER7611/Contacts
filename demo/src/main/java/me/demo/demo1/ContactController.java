package me.demo.demo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {
        return contactRepository.save(contact); // 使用 JPA 保存联系人
    }

    @GetMapping
    public List<Contact> getContacts() {
        return contactRepository.findAll(); // 获取所有联系人
    }

    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact updatedContact) {
        updatedContact.setId(id); // 设置 ID
        return contactRepository.save(updatedContact); // 更新联系人
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id); // 删除联系人
    }
}
