package me.demo.demo1;

import javax.persistence.*;

@Entity
@Table(name = "contacts") // 指定表名
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增 ID
    private Long id; // 修改为 Long 类型

    private String name;
    private String phone;
    private String email;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
